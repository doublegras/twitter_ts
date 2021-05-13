"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const nodemailer_1 = __importDefault(require("nodemailer"));
const sparkPostTransport = require("nodemailer-sparkpost-transport");
const path_1 = __importDefault(require("path"));
const pug_1 = __importDefault(require("pug"));
const _env_1 = __importDefault(require("../.env"));
const env = _env_1.default[process.env.NODE_ENV];
class Email {
    constructor() {
        this.from = "doublegras <contact@doublegras.tech>";
        if (process.env.NODE_ENV === "production") {
            this.transporter = nodemailer_1.default.createTransport(sparkPostTransport({
                sparkPostApiKey: env.sparkPostApiKey,
            }));
        }
        else {
            this.transporter = nodemailer_1.default.createTransport({
                host: "smtp.mailtrap.io",
                port: 587,
                auth: {
                    user: "68595eb5060734",
                    pass: "022fe95ccfc31c",
                },
            });
        }
    }
    async sendVerificationEmail(options) {
        try {
            const email = {
                from: this.from,
                to: options.to,
                subject: "Email de vérification",
                html: pug_1.default.renderFile(path_1.default.join(__dirname, "../../templates/email-verification.pug"), {
                    username: options.username,
                    url: `https://${options.host}:${env.portHttps}/user/email-verification/${options.userId}/${options.token}`,
                }),
            };
            const data = await this.transporter.sendMail(email);
            console.log("email verification send: ", data);
        }
        catch (err) {
            console.log(err);
            throw err;
        }
    }
    async sendResetPasswordLink(options) {
        try {
            const email = {
                from: this.from,
                to: options.to,
                subject: "Reset password",
                html: pug_1.default.renderFile(path_1.default.join(__dirname, "../../templates/reset-password.pug"), {
                    url: `https://${options.host}/user/reset-password/${options.userId}/${options.token}`,
                }),
            };
            const data = await this.transporter.sendMail(email);
            console.log("email reset password send: ", data);
        }
        catch (err) {
            console.log(err);
            throw err;
        }
    }
}
exports.default = new Email();
//# sourceMappingURL=email.js.map