import { Response } from "express";
import { createContactForm } from "./db";

const saveContactLead = async (req: any, res: Response) => {
  try {
    const data = req.body;
    const { data: contactLead, error } = await createContactForm(data);
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
