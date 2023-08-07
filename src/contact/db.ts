import { ContactForm, PrismaClient } from "@prisma/client";
import { ContactDTO } from "./schema";

const prisma = new PrismaClient();

async function createContactForm(data: ContactDTO): Promise<{
  data: ContactForm | null;
  error: string | null;
}> {
  try {
    const contactForm = await prisma.contactForm.create({ data });
    return { data: contactForm, error: null };
  } catch (error: any) {
    return { data: null, error: error.message };
  }
}

export { createContactForm };
