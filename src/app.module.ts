import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { NotificationsModule } from './api/notifications/notifications.module';
import 'dotenv/config';
import * as process from 'process';
import { EmailsModule } from './api/emails/emails.module';
import { ReactAdapter } from '@webtre/nestjs-mailer-react-adapter';
import { MailerModule } from '@nestjs-modules/mailer';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    MongooseModule.forRoot(process.env.MONGO_URI, {
      dbName: process.env.DB_NAME,
    }),
    MailerModule.forRoot({
      transport: {
        host: process.env.MAIL_HOST,
        port: process.env.MAIL_PORT,
        secure: true,
        auth: {
          user: process.env.MAIL_USER,
          pass: process.env.MAIL_PASS,
        },
      },
      defaults: {
        from: '"MyCandys Shop" <hello@domain.com>',
      },
      template: {
        dir: __dirname + '/templates',
        // Use the adapter
        adapter: new ReactAdapter(),
      },
    }),
    NotificationsModule,
    EmailsModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
