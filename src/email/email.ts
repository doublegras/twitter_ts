import nodemailer from "nodemailer";
const sparkPostTransport = require("nodemailer-sparkpost-transport");
import Mail from "nodemailer/lib/mailer";
import path from "path";
import pug from "pug";
import conf from "../.env";
const env = conf[process.env.NODE_ENV as "developpement" | "production"];
import { IEmail, IEmailOptions } from "../interfaces/email.interface";

class Email {
  from = "doublegras <contact@doublegras.tech>";
  transporter: Mail;
  constructor() {
    if (process.env.NODE_ENV === "production") {
      this.transporter = nodemailer.createTransport(
        sparkPostTransport({
          sparkPostApiKey: env.sparkPostApiKey,
        })
      );
    } else {
      this.transporter = nodemailer.createTransport({
        host: "smtp.mailtrap.io",
        port: 587,
        auth: {
          user: "68595eb5060734",
          pass: "022fe95ccfc31c",
        },
      });
    }
  }

  async sendVerificationEmail(options: IEmailOptions) {
    try {
      const email: IEmail = {
        from: this.from,
        to: options.to,
        subject: "Email de vérification",
        html: pug.renderFile(
          path.join(__dirname, "../../templates/email-verification.pug"),
          {
            username: options.username,
            url: `https://${options.host}:${env.portHttps}/user/email-verification/${options.userId}/${options.token}`,
          }
        ),
      };
      const data = await this.transporter.sendMail(email);
      console.log("email verification send: ", data);
    } catch (err) {
      console.log(err);
      throw err;
    }
  }

  async sendResetPasswordLink(options: IEmailOptions) {
    try {
      const email: IEmail = {
        from: this.from,
        to: options.to,
        subject: "Reset password",
        html: pug.renderFile(
          path.join(__dirname, "../../templates/reset-password.pug"),
          {
            url: `https://${options.host}/user/reset-password/${options.userId}/${options.token}`,
          }
        ),
      };
      const data = await this.transporter.sendMail(email);
      console.log("email reset password send: ", data);
    } catch (err) {
      console.log(err);
      throw err;
    }
  }
}

export default new Email();
