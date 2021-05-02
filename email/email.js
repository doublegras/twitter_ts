const nodemailer = require('nodemailer');
const sparkPostTransport = require('nodemailer-sparkpost-transport');
const path = require('path');
const pug = require('pug');
const env = require(`../.env/${ process.env.NODE_ENV }`);


class Email {

  constructor() {

    this.from = 'doublegras <contact@doublegras.tech>';
    if (process.env.NODE_ENV === 'production') {
      this.transporter = nodemailer.createTransport(
        sparkPostTransport({
          sparkPostApiKey: env.sparkPostApiKey
        })
      )
    } else {
      this.transporter = nodemailer.createTransport({
        host: "smtp.mailtrap.io",
        port: 2525,
        auth: {
          user: "68595eb5060734",
          pass: "022fe95ccfc31c"
        }
      })
    }
  }

  async sendVerificationEmail(options) {
    try {
      const email = {
        from: this.from,
        to: options.to,
        subject: 'Email de vérification',
        html: pug.renderFile(path.join(__dirname, 'templates/email-verification.pug'), {
          username: options.username,
        url: `https://${ options.host }:${ env.portHttps }/user/email-verification/${ options.userId }/${ options.token }`
        })
      }
      const data = await this.transporter.sendMail(email);
      console.log('email send: ', data);
    } catch (err) {
      console.log(err);
      throw err;
    }
  }

}

module.exports = new Email;