import type { APIRoute } from 'astro';

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

  const webhookUrl = import.meta.env.CONTACT_FORM_WEBHOOK_URL;

  if (!webhookUrl) {
    return jsonResponse(
      {
        ok: false,
        code: 'delivery_not_configured',
        error: 'Wysyłka automatyczna nie jest jeszcze skonfigurowana.',
      },
      503
    );
  }

  const webhookResponse = await fetch(webhookUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      ...payload,
      recipientEmail: 'kontakt@iliclinic.pl',
      submittedAt: new Date().toISOString(),
      source: 'website-contact-form',
    }),
  }).catch(() => null);

  if (!webhookResponse?.ok) {
    return jsonResponse(
      {
        ok: false,
        error: 'Nie udało się przekazać formularza do systemu kontaktowego.',
      },
      502
    );
  }

  return jsonResponse({
    ok: true,
  });
};
