import { Response } from "express";
import { createLeadForm, contactForm, upsertUser } from "./db";
import { ContactDTO } from "./schema";
import { LeadForm, SubscribedUser } from "@prisma/client";

const saveContactLead = async (req: any, res: Response) => {
  try {
    const data: {
      organisationName: string;
      industries: string[];
      servicesNeeded: string[];
      fullName: string;
      position: string;
      businessPhoneNumber: string;
      companyEmail: string;
    } = req.body;

    const createData: ContactDTO = {
      ...data,
      industries: JSON.stringify(data.industries),
      servicesNeeded: JSON.stringify(data.servicesNeeded),
    };

    const { data: contactLead, error } = await createLeadForm(createData);

    if (error !== null) {
      return res.status(400).json({
        data: null,
        error,
      });
    }

    return res.json({
      data: contactLead,
      error,
    });
  } catch (err: any) {
    const error = err.message || err;
    res.status(500).json({
      data: null,
      error,
    });
  }
};

const saveContactMessage = async (req: any, res: Response) => {
  try {
    const data: Omit<LeadForm, "id"> = req.body;

    const { data: contactLead, error } = await contactForm(data);

    if (error !== null) {
      return res.status(400).json({
        data: null,
        error,
      });
    }

    return res.json({
      data: contactLead,
      error,
    });
  } catch (err: any) {
    const error = err.message || err;
    res.status(500).json({
      data: null,
      error,
    });
  }
};

const subscribe = async (req: any, res: Response) => {
  try {
    const data: Omit<SubscribedUser, "id"> = req.body;

    const { data: contactLead, error } = await upsertUser(data);

    if (error !== null) {
      return res.status(400).json({
        data: null,
        error,
      });
    }

    return res.json({
      data: contactLead,
      error,
    });
  } catch (err: any) {
    const error = err.message || err;
    res.status(500).json({
      data: null,
      error,
    });
  }
};

export { saveContactLead, saveContactMessage, subscribe };
