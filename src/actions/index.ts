import { ActionError, defineAction } from 'astro:actions';
import { z } from 'astro/zod';
import {
  normalizeEmail,
  normalizePolishPhone,
  sendContactEmail,
  sendTelegramNotification,
  type ContactPayload,
} from '../lib/contact';

const optionalTrimmedString = z
  .string()
  .transform((value) => value.trim())
  .optional()
  .default('');

const optionalEmailString = optionalTrimmedString.transform((value) => normalizeEmail(value));
const polishPhoneString = z
  .string()
  .trim()
  .transform((value, ctx) => {
    const normalized = normalizePolishPhone(value);
    if (!normalized) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'Podaj poprawny polski numer telefonu.',
      });
      return z.NEVER;
    }
    return normalized;
  });

export const server = {
  contact: defineAction({
    accept: 'form',
    input: z.object({
      location: optionalTrimmedString,
      locationName: optionalTrimmedString,
      name: z.string().trim().min(2, 'Podaj imię i nazwisko.'),
      phone: polishPhoneString,
      email: optionalEmailString.refine(
        (value) => !value || z.string().email().safeParse(value).success,
        'Podaj poprawny adres e-mail.'
      ),
      message: optionalTrimmedString,
      inquiryType: z.enum(['message', 'callback']).default('message'),
      pageUrl: optionalTrimmedString,
    }),
    handler: async (input) => {
      if (input.inquiryType === 'message' && input.message.length < 10) {
        throw new ActionError({
          code: 'BAD_REQUEST',
          message: 'Wpisz krótką wiadomość, abyśmy wiedzieli, jak pomóc.',
        });
      }

      const payload: ContactPayload = {
        location: input.location,
        locationName: input.locationName,
        name: input.name,
        phone: input.phone,
        email: input.email,
        message: input.message,
        callbackRequested: input.inquiryType === 'callback',
        inquiryType: input.inquiryType,
        pageUrl: input.pageUrl,
      };

      try {
        await sendContactEmail(import.meta.env as Record<string, string | undefined>, payload);
        await sendTelegramNotification(import.meta.env as Record<string, string | undefined>, payload);
      } catch (error) {
        if (error instanceof Error && error.message.startsWith('delivery_not_configured')) {
          console.error('[contact-action] Missing SMTP env keys:', error.message.replace('delivery_not_configured:', ''));
          throw new ActionError({
            code: 'INTERNAL_SERVER_ERROR',
            message: 'Wysyłka automatyczna nie jest jeszcze skonfigurowana.',
          });
        }

        throw new ActionError({
          code: 'INTERNAL_SERVER_ERROR',
          message: 'Nie udało się wysłać formularza. Spróbuj ponownie lub skontaktuj się telefonicznie.',
        });
      }

      return {
        ok: true,
      };
    },
  }),
};
