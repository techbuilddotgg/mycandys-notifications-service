import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { NotificationsController } from './notifications.controller';
import { NotificationsService } from './notifications.service';
import {
  Notification,
  NotificationSchema,
} from './schemas/notification.schema';
import { NotificationRepository } from './repository/notification.repository';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Notification.name, schema: NotificationSchema },
    ]),
    HttpModule,
  ],
  controllers: [NotificationsController],
  providers: [NotificationsService, NotificationRepository],
  exports: [NotificationsService, NotificationRepository],
})
export class NotificationsModule {}
