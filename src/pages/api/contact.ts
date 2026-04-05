import type { APIRoute } from 'astro';
import nodemailer from 'nodemailer';

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

type ContactPayload = {
  location: string;
  locationName: string;
  name: string;
  phone: string;
  email: string;
  message: string;
  callbackRequested: boolean;
  inquiryType: 'message' | 'callback';
  pageUrl: string;
};

function jsonResponse(body: Record<string, unknown>, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: {
      'Content-Type': 'application/json',
    },
  });
}

function getSmtpConfig(env: ImportMetaEnv) {
  const host = String(env.SMTP_HOST || 'host725744.hostido.net.pl').trim();
  const port = Number(env.SMTP_PORT || 587);
  const user = String(env.SMTP_USER || '').trim();
  const pass = String(env.SMTP_PASS || '').trim();
  const from = String(env.SMTP_FROM || user).trim();
  const to = String(env.CONTACT_TO_EMAIL || from).trim();

  if (!host || !port || !user || !pass || !from || !to) {
    return null;
  }

  return {
    host,
    port,
    user,
    pass,
    from,
    to,
    secure: port === 465,
  };
}

function buildMailSubject(payload: ContactPayload) {
  return payload.inquiryType === 'callback'
    ? `Prośba o kontakt telefoniczny (${payload.locationName})`
    : `Nowa wiadomość ze strony ili Clinic (${payload.locationName})`;
}

function buildMailText(payload: ContactPayload) {
  return [
    `Lokalizacja: ${payload.locationName || payload.location || 'nie podano'}`,
    `Typ zgłoszenia: ${payload.inquiryType === 'callback' ? 'prośba o oddzwonienie' : 'wiadomość kontaktowa'}`,
    `Imię i nazwisko: ${payload.name}`,
    `Telefon: ${payload.phone}`,
    `E-mail: ${payload.email || 'nie podano'}`,
    '',
    payload.inquiryType === 'callback' ? 'Dodatkowe informacje:' : 'Wiadomość:',
    payload.message || 'brak',
    '',
    `Źródło: ${payload.pageUrl || 'nie podano'}`,
    `Wysłano: ${new Date().toISOString()}`,
  ].join('\n');
}

function normalizePayload(input: unknown): ContactPayload | null {
  if (!input || typeof input !== 'object') return null;

  const payload = input as Record<string, unknown>;
  const name = String(payload.name || '').trim();
  const phone = String(payload.phone || '').trim();
  const email = String(payload.email || '').trim();
  const message = String(payload.message || '').trim();
  const inquiryType = payload.inquiryType === 'callback' ? 'callback' : 'message';

  if (!name || name.length < 2) return null;
  if (!phone || phone.length < 7) return null;
  if (inquiryType === 'message' && (!message || message.length < 10)) return null;
  if (email && !emailPattern.test(email)) return null;

  return {
    location: String(payload.location || '').trim(),
    locationName: String(payload.locationName || '').trim(),
    name,
    phone,
    email,
    message,
    callbackRequested: inquiryType === 'callback' ? true : Boolean(payload.callbackRequested),
    inquiryType,
    pageUrl: String(payload.pageUrl || '').trim(),
  };
}

export const POST: APIRoute = async ({ request }) => {
  const payload = normalizePayload(await request.json().catch(() => null));

  if (!payload) {
    return jsonResponse(
      {
        ok: false,
        error: 'Sprawdź pola formularza i spróbuj ponownie.',
      },
      400
    );
  }

  const smtp = getSmtpConfig(import.meta.env);

  if (!smtp) {
    return jsonResponse(
      {
        ok: false,
        code: 'delivery_not_configured',
        error: 'Wysyłka automatyczna nie jest jeszcze skonfigurowana.',
      },
      503
    );
  }

  try {
    const transport = nodemailer.createTransport({
      host: smtp.host,
      port: smtp.port,
      secure: smtp.secure,
      auth: {
        user: smtp.user,
        pass: smtp.pass,
      },
    });

    await transport.sendMail({
      from: smtp.from,
      to: smtp.to,
      replyTo: payload.email || undefined,
      subject: buildMailSubject(payload),
      text: buildMailText(payload),
    });
  } catch {
    return jsonResponse(
      {
        ok: false,
        error: 'Nie udało się wysłać formularza. Spróbuj ponownie lub skontaktuj się telefonicznie.',
      },
      502
    );
  }

  return jsonResponse({
    ok: true,
  });
};
