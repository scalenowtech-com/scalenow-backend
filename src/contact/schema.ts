import { ContactForm } from "@prisma/client";

export type ContactDTO = Omit<ContactForm, "id">;
