import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import { NotificationsService } from '../notifications/notifications.service';
import { CreateEmailDto } from './dto/create-email.dto';

@Injectable()
export class EmailsService {
  constructor(
    private readonly mailerService: MailerService,
    private readonly notificationsService: NotificationsService,
  ) {}

  private async generateEmail(
    user: string,
    subject: string,
    title: string,
    message: string,
  ) {
    await this.mailerService.sendMail({
      to: user,
      subject: subject,
      template: 'mail',
      context: {
        title: title,
        message: message,
      },
    });
  }

  async sendEmail(data: CreateEmailDto): Promise<string> {
    await this.notificationsService
      .create({
        title: data.title,
        message: data.message,
        type: data.type,
      })
      .then(async (res) => {
        await this.generateEmail(data.user, res.type, res.title, res.message);
      })
      .catch((err) => {
        throw new Error(err);
      });

    return 'Email was sent';
  }
}
