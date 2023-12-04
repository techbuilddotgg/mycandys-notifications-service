import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import {
  Notification,
  NotificationDocument,
} from '../schemas/notification.schema';
import { FilterQuery, Model, UpdateQuery } from 'mongoose';
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

  async findAll(): Promise<NotificationDocument[]> {
    return this.notificationModel.find();
  }

  async findOneAndUpdate(
    notificationFilterQuery: FilterQuery<NotificationDocument>,
    notification: UpdateQuery<NotificationDocument>,
  ): Promise<NotificationDocument> {
    return this.notificationModel.findOneAndUpdate(
      notificationFilterQuery,
      notification,
      { new: true },
    );
  }

  async findOneAndDelete(
    notificationFilterQuery: FilterQuery<NotificationDocument>,
  ) {
    return this.notificationModel.findOneAndDelete(notificationFilterQuery);
  }
}
