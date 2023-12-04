import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import {
  Notification,
  NotificationDocument,
} from '../schemas/notification.schema';
import { Model } from 'mongoose';
import { CreateNotificationDto } from '../dto/create-notification.dto';

@Injectable()
export class NotificationRepository {
  constructor(
    @InjectModel(Notification.name)
    private readonly notificationModel: Model<NotificationDocument>,
  ) {}

  async create(
    notification: CreateNotificationDto,
  ): Promise<NotificationDocument> {
    const entity = new this.notificationModel(notification);
    return entity.save();
  }
  async findById(id: string): Promise<NotificationDocument> {
    return this.notificationModel.findById(id);
  }
}
