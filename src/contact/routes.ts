import { Router } from "express";
import { saveContactLead, saveContactMessage, subscribe } from "./service";
export const router = Router();

router.post("/", saveContactMessage);
router.post("/lead", saveContactLead);
router.post("/subscribe", subscribe);
