import path from 'path';
import fs from 'fs';
import handlebars from 'handlebars';
import nodemailer, { Transporter } from 'nodemailer';

class SendMailService {
  private client: Transporter;

  constructor () {
    nodemailer
      .createTestAccount()
      .then(account => {
        let transporter = nodemailer.createTransport({
          host: account.smtp.host,
          port: account.smtp.port,
          secure: account.smtp.secure,
          auth: {
            user: account.user,
            pass: account.pass,
          }
        });

        this.client = transporter;
      });
  }

  async execute(
    to: string, 
    subject: string, 
    variables: object, 
    templatePath: string
  ) {
    const mailTemplateFile = fs
      .readFileSync(templatePath).toString('utf8');

    const mailTemplateParse = handlebars
      .compile(mailTemplateFile);

    const mailTemplateHtml = 
      mailTemplateParse(variables);

    const message = await this.client.sendMail({
      to,
      subject,
      html: mailTemplateHtml,
      from: 'NPS <noreply@nps.com.br>'
    });

    console.log('Message send: %s', message.messageId);
    console.log('Preview URL: %s', nodemailer.getTestMessageUrl(message));
  }

}

export default new SendMailService();