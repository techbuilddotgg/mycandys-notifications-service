import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';

@Injectable()
export class EmailsService {
  constructor(private readonly mailerService: MailerService) {}

  public async example(): Promise<void> {
    await this.mailerService.sendMail({
      to: 'sulcergregor@gmail.com',
      subject: 'Testing react template',
      template: 'welcome', // The compiled extension is appended automatically.
      context: {
        // Data to be passed as props to your template.
        code: '123456',
        name: 'John Doe',
      },
    });
  }

  async create() {
    return 'This action sends a new email';
  }
}
