import { HttpException, Injectable } from '@nestjs/common';
import { CreateNotificationDto } from './dto/create-notification.dto';
import { NotificationRepository } from './repository/notifications.repository';
import { NotificationDocument } from './schemas/notification.schema';

@Injectable()
export class NotificationsService {
  constructor(
    private readonly notificationRepository: NotificationRepository,
  ) {}

  async findById(id: string): Promise<NotificationDocument> {
    const notification = await this.notificationRepository.findById(id);
    if (!notification) {
      throw new HttpException('User not found', 404);
    }
    return notification;
  }

  async create(data: CreateNotificationDto): Promise<NotificationDocument> {
    return await this.notificationRepository.create(data);
  }
}
