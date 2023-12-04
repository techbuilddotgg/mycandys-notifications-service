import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateNotificationDto } from './dto/create-notification.dto';
import { NotificationRepository } from './repository/notifications.repository';
import { NotificationDocument } from './schemas/notification.schema';
import { UpdateNotificationDto } from './dto/update-notification.dto';

@Injectable()
export class NotificationsService {
  constructor(
    private readonly notificationRepository: NotificationRepository,
  ) {}

  async findById(id: string): Promise<NotificationDocument> {
    const notification = await this.notificationRepository.findById(id);
    if (!notification) {
      throw new NotFoundException('User not found');
    }
    return notification;
  }

  async create(data: CreateNotificationDto): Promise<NotificationDocument> {
    return await this.notificationRepository.create(data);
  }

  async findAll(): Promise<NotificationDocument[]> {
    return await this.notificationRepository.findAll();
  }

  async update(
    notificationId: string,
    notification: UpdateNotificationDto,
  ): Promise<NotificationDocument> {
    return await this.notificationRepository.findOneAndUpdate(
      { id: notificationId },
      notification,
    );
  }

  async delete(notificationId: string): Promise<boolean> {
    const deletedNotification =
      await this.notificationRepository.findOneAndDelete({
        id: notificationId,
      });

    if (!deletedNotification) {
      throw new NotFoundException('Notification not found');
    }

    return !!deletedNotification;
  }
}
