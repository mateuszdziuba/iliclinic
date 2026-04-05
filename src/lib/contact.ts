import nodemailer from 'nodemailer';

export type ContactPayload = {
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

type SmtpConfig = {
  host: string;
  port: number;
  user: string;
  pass: string;
  from: string;
  to: string;
  secure: boolean;
};

export function getSmtpConfig(env: ImportMetaEnv): SmtpConfig | null {
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

export function buildMailSubject(payload: ContactPayload) {
  return payload.inquiryType === 'callback'
    ? `Prośba o kontakt telefoniczny (${payload.locationName})`
    : `Nowa wiadomość ze strony ili Clinic (${payload.locationName})`;
}

export function buildMailText(payload: ContactPayload) {
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

export async function sendContactEmail(env: ImportMetaEnv, payload: ContactPayload) {
  const smtp = getSmtpConfig(env);

  if (!smtp) {
    throw new Error('delivery_not_configured');
  }

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
}
