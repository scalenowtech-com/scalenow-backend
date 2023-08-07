import { Router } from "express";
import { saveContactLead } from "./service";
export const router = Router();

router.post("/lead", saveContactLead);
