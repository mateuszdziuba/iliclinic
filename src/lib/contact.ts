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

type EnvSource = Record<string, string | undefined>;

function readEnv(key: string, env?: EnvSource) {
  const runtimeValue = typeof process !== 'undefined' ? process.env[key] : undefined;
  return runtimeValue ?? env?.[key];
}

export function getSmtpConfig(env?: EnvSource): SmtpConfig | null {
  const host = String(readEnv('SMTP_HOST', env) || 'host725744.hostido.net.pl').trim();
  const port = Number(readEnv('SMTP_PORT', env) || 587);
  const user = String(readEnv('SMTP_USER', env) || '').trim();
  const pass = String(readEnv('SMTP_PASS', env) || '').trim();
  const from = String(readEnv('SMTP_FROM', env) || user).trim();
  const to = String(readEnv('CONTACT_TO_EMAIL', env) || from).trim();

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

export function getMissingSmtpKeys(env?: EnvSource) {
  const requiredKeys = ['SMTP_HOST', 'SMTP_PORT', 'SMTP_USER', 'SMTP_PASS', 'SMTP_FROM', 'CONTACT_TO_EMAIL'];
  return requiredKeys.filter((key) => !String(readEnv(key, env) || '').trim());
}

export async function sendContactEmail(env: EnvSource | undefined, payload: ContactPayload) {
  const smtp = getSmtpConfig(env);

  if (!smtp) {
    const missingKeys = getMissingSmtpKeys(env);
    throw new Error(`delivery_not_configured:${missingKeys.join(',')}`);
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
