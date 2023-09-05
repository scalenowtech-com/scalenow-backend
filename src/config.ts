import { config } from "dotenv";

config();

export const {
  PORT,
  DATABASE_URL,
  MAIL_PASSWORD,
  MAIL_SERVICES,
  MAIL_USERNAME,
} = process.env;
