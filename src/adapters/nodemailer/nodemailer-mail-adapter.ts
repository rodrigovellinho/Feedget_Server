import { MailAdapter, SendMailData } from "../mail-adapter";
import nodemailer from "nodemailer";

const transport = nodemailer.createTransport({
  host: "smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: "2252e7d0a4dfc1",
    pass: "1341db2da2c23d",
  },
});

export class NodemailerMailAdapter implements MailAdapter {
  async sendmail({ subject, body }: SendMailData) {
    await transport.sendMail({
      from: "Equipe FeedGet <oi@feedget.com>",
      to: "Rodrigo <rodrigo.kloeckner@gmail.com>",
      subject,
      html: body,
    });
  }
}
