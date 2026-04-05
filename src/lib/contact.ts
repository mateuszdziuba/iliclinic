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

export function normalizeEmail(value: string) {
  return value.trim().toLowerCase();
}

export function normalizePolishPhone(value: string) {
  const trimmed = value.trim();
  const normalized = trimmed.replace(/[\s\-().]/g, '');

  if (normalized.startsWith('+48')) {
    const digits = normalized.slice(3);
    if (/^\d{9}$/.test(digits)) return `+48 ${digits.slice(0, 3)} ${digits.slice(3, 6)} ${digits.slice(6)}`;
    return null;
  }

  if (normalized.startsWith('48') && /^\d{11}$/.test(normalized)) {
    const digits = normalized.slice(2);
    return `+48 ${digits.slice(0, 3)} ${digits.slice(3, 6)} ${digits.slice(6)}`;
  }

  if (/^\d{9}$/.test(normalized)) {
    return `+48 ${normalized.slice(0, 3)} ${normalized.slice(3, 6)} ${normalized.slice(6)}`;
  }

  return null;
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

function escapeTelegramHtml(value: string) {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;');
}

function buildTelegramMessage(payload: ContactPayload) {
  const heading = payload.inquiryType === 'callback' ? 'Nowe zgłoszenie oddzwonienia' : 'Nowa wiadomość z formularza';

  return [
    `<b>${escapeTelegramHtml(heading)}</b>`,
    '',
    `<b>Lokalizacja:</b> ${escapeTelegramHtml(payload.locationName || payload.location || 'nie podano')}`,
    `<b>Imię i nazwisko:</b> ${escapeTelegramHtml(payload.name)}`,
    `<b>Telefon:</b> ${escapeTelegramHtml(payload.phone)}`,
    `<b>E-mail:</b> ${escapeTelegramHtml(payload.email || 'nie podano')}`,
    payload.inquiryType === 'callback'
      ? `<b>Najlepsza pora:</b> ${escapeTelegramHtml(payload.message || 'nie podano')}`
      : `<b>Wiadomość:</b> ${escapeTelegramHtml(payload.message || 'nie podano')}`,
    `<b>Źródło:</b> ${escapeTelegramHtml(payload.pageUrl || 'nie podano')}`,
  ].join('\n');
}

export async function sendTelegramNotification(env: EnvSource | undefined, payload: ContactPayload) {
  const botToken = String(readEnv('TELEGRAM_BOT_TOKEN', env) || '').trim();
  const chatId = String(readEnv('TELEGRAM_CHAT_ID', env) || '').trim();

  if (!botToken || !chatId) return;

  const response = await fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      chat_id: chatId,
      text: buildTelegramMessage(payload),
      parse_mode: 'HTML',
      disable_web_page_preview: true,
    }),
  });

  if (!response.ok) {
    throw new Error(`telegram_notification_failed:${response.status}`);
  }
}
