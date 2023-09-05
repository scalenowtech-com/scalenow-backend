import nodemailer, { Transporter } from "nodemailer";
import { MAIL_PASSWORD, MAIL_SERVICES, MAIL_USERNAME } from "../config";

const createTransporter = (): Transporter => {
  return nodemailer.createTransport({
    service: MAIL_SERVICES,
    auth: {
      user: MAIL_USERNAME,
      pass: MAIL_PASSWORD,
    },
  });
};

export const sendEmail = (mailOptions: {
  from: string;
  to: string;
  subject: string;
  html: string;
}): void => {
  const transporter: Transporter = createTransporter();
  transporter
    .sendMail(mailOptions)
    .then((response) => {
      console.log("EMAIL_SENT SUCCESSFULLY", response.messageId);
    })
    .catch((error) => {
      console.log("FAILED TO SEND EMAIL", error);
    });
};
