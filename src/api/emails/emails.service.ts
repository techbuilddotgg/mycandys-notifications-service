import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import { NotificationsService } from '../notifications/notifications.service';
import { CreateEmailDto } from './dto/create-email.dto';
import { ConfigService } from '@nestjs/config';
import { google } from 'googleapis';
import * as process from 'process';
import { Options } from 'nodemailer/lib/smtp-transport';

@Injectable()
export class EmailsService {
  constructor(
    private readonly mailerService: MailerService,
    private readonly configService: ConfigService,
    private readonly notificationsService: NotificationsService,
  ) {}

  private async setTransport() {
    const OAuth2 = google.auth.OAuth2;
    const oauth2Client = new OAuth2(
      this.configService.get('CLIENT_ID'),
      this.configService.get('CLIENT_SECRET'),
      'https://developers.google.com/oauthplayground',
    );

    oauth2Client.setCredentials({
      refresh_token: process.env.REFRESH_TOKEN,
    });

    const accessToken: string = await new Promise((resolve, reject) => {
      oauth2Client.getAccessToken((err, token) => {
        if (err) {
          reject('Failed to create access token :(');
        }
        resolve(token);
      });
    });

    const config: Options = {
      service: 'gmail',
      auth: {
        type: 'OAuth2',
        user: this.configService.get('EMAIL'),
        clientId: this.configService.get('CLIENT_ID'),
        clientSecret: this.configService.get('CLIENT_SECRET'),
        accessToken,
      },
    };
    this.mailerService.addTransporter('gmail', config);
  }

  public async sendMail(data: CreateEmailDto) {
    await this.setTransport();
    this.mailerService
      .sendMail({
        transporterName: 'gmail',
        to: data.users,
        from: 'noreply@nestjs.com',
        subject: data.type,
        template: 'action',
        context: {
          title: data.title,
          message: data.message,
        },
      })
      .then((res) => {
        console.log(res);

        this.notificationsService.create({
          title: data.title,
          message: data.message,
          type: data.type,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }
}
