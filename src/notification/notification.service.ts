import { ISendMailOptions, MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';

@Injectable()
export class NotificationService {
  constructor(private readonly mailerService: MailerService) {}

  private async sendEmail(data: {
    to: string;
    subject: string;
    text?: string;
    html?: string;
  }) {
    const sendEmailConfig: ISendMailOptions = {
      to: data.to,
      subject: data.subject,
    };
    if (!data.html && !data.text) {
      throw new Error('text or html is required for sending email');
    }
    if (data.html) sendEmailConfig.html = data.html;
    else sendEmailConfig.text = data.text;

    await this.mailerService.sendMail(sendEmailConfig);
  }

  async sendEmailForNewLogin(email: string): Promise<void> {
    const subject = '<Security Alert> New Login to awesome blog';
    const html = `
    <h1>IMPORTANT! New login to Awesome Blog</h1>
    <p>
        Hi! someone login with your identity at ${new Date().toISOString()}.
        If it wasn't you, call support!
    </p>
    `;
    await this.sendEmail({
      to: email,
      subject,
      html,
    });
  }

  async sendEmailForNewPost(email: string, postTitle: string): Promise<void> {
    const subject = 'New post published at awesome blog';
    const html = `
    <h1>New post published at Awesome Blog</h1>
    <p>
        Hi! new post with title <i>${postTitle}</i> published at ${new Date().toISOString()}.
        If it wasn't you, call support!
    </p>
    `;
    await this.sendEmail({
      to: email,
      subject,
      html,
    });
  }

  async sendEmailForDeletePost(email: string, postTitle: string): Promise<void> {
    const subject = 'You Delete your post at awesome blog';
    const html = `
    <h1>You Delete your post at Awesome Blog</h1>
    <p>
        Hi! post with title <i>${postTitle}</i> deleted at ${new Date().toISOString()}.
        If it wasn't you, call support!
    </p>
    `;
    await this.sendEmail({
      to: email,
      subject,
      html,
    });
  }
}
