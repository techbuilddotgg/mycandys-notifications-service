import { Module } from '@nestjs/common';
import { EmailsController } from './emails.controller';
import { EmailsService } from './emails.service';
import { NotificationsService } from '../notifications/notifications.service';
import { NotificationsModule } from '../notifications/notifications.module';
import { MongooseModule } from '@nestjs/mongoose';
import {
  Notification,
  NotificationSchema,
} from '../notifications/schemas/notification.schema';
import { ConfigService } from '@nestjs/config';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Notification.name, schema: NotificationSchema },
    ]),
    NotificationsModule,
  ],
  controllers: [EmailsController],
  providers: [EmailsService, NotificationsService, ConfigService],
  exports: [EmailsService],
})
export class EmailsModule {}
