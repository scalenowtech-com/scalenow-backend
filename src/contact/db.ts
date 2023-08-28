import {
  ContactForm,
  LeadForm,
  PrismaClient,
  SubscribedUser,
} from "@prisma/client";
import { ContactDTO } from "./schema";

const prisma = new PrismaClient();

async function createLeadForm(data: ContactDTO): Promise<{
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

async function contactForm(data: Omit<LeadForm, "id">): Promise<{
  data: LeadForm | null;
  error: string | null;
}> {
  try {
    const contactForm = await prisma.leadForm.create({ data });
    return { data: contactForm, error: null };
  } catch (error: any) {
    return { data: null, error: error.message };
  }
}

async function upsertUser(data: Omit<SubscribedUser, "id">): Promise<{
  data: SubscribedUser | null;
  error: string | null;
}> {
  try {
    const contactForm = await prisma.subscribedUser.upsert({
      where: {
        email: data.email,
      },
      update: {
        isSubscribed: data.isSubscribed,
      },
      create: {
        email: data.email,
        lastName: data.lastName,
        firstName: data.firstName,
        isSubscribed: data.isSubscribed,
      },
    });
    return { data: contactForm, error: null };
  } catch (error: any) {
    return { data: null, error: error.message };
  }
}

export { createLeadForm, contactForm, upsertUser };
