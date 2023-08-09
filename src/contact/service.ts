import { Response } from "express";
import { createContactForm } from "./db";
import { ContactDTO } from "./schema";

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

    const { data: contactLead, error } = await createContactForm(createData);

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

export { saveContactLead };
