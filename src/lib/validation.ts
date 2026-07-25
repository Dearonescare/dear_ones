import { z } from "zod";

/**
 * Enquiry form schema — shared by the client form and the server action/API.
 * Keeping a single source of truth avoids drift between browser and server
 * validation.
 */

export const SUPPORT_TYPES = [
  "Regular wellbeing visits",
  "Health and routine observations",
  "Hospital or appointment support",
  "Everyday assistance",
  "Home or property support",
  "Comprehensive care coordination",
  "On-demand support",
  "Not sure yet",
] as const;

export const CONTACT_METHODS = ["Phone", "WhatsApp", "Email"] as const;

export const CONTACT_TIMES = [
  "Morning",
  "Afternoon",
  "Evening",
  "Any time",
] as const;

export const enquirySchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Please enter your name.")
    .max(80, "That name looks too long."),
  email: z
    .string()
    .trim()
    .min(1, "Please enter your email address.")
    .email("Please enter a valid email address."),
  phone: z
    .string()
    .trim()
    .min(6, "Please enter a contactable number.")
    .max(30, "That number looks too long.")
    .regex(/^[\d+\-\s()]+$/, "Please enter a valid phone or WhatsApp number."),
  country: z
    .string()
    .trim()
    .min(2, "Please tell us where you currently live.")
    .max(60),
  parentCity: z
    .string()
    .trim()
    .min(2, "Please share your parent’s city.")
    .max(80),
  supportType: z.enum(SUPPORT_TYPES, {
    message: "Please choose the type of support.",
  }),
  contactMethod: z.enum(CONTACT_METHODS, {
    message: "Please choose a preferred contact method.",
  }),
  contactTime: z.enum(CONTACT_TIMES, {
    message: "Please choose a preferred contact time.",
  }),
  message: z
    .string()
    .trim()
    .max(1500, "Please keep your message under 1500 characters.")
    .optional()
    .or(z.literal("")),
  consent: z
    .boolean()
    .refine((v) => v === true, "Please confirm you agree to be contacted."),
  // Honeypot: must remain empty. Bots tend to fill every field.
  company: z.string().max(0).optional().or(z.literal("")),
});

export type EnquiryInput = z.infer<typeof enquirySchema>;

export type EnquiryFieldErrors = Partial<
  Record<keyof EnquiryInput, string>
>;

export type EnquiryResult =
  | { status: "success" }
  | { status: "error"; message: string; fieldErrors?: EnquiryFieldErrors }
  | {
      // Email delivery not configured: acknowledge without falsely claiming
      // the message was sent, and offer direct fallbacks.
      status: "unconfigured";
      message: string;
    };
