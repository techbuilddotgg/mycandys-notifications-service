import {
  Body,
  Controller,
  Get,
  HttpException,
  Param,
  Post,
} from '@nestjs/common';
import {
  ApiOkResponse,
  ApiPreconditionFailedResponse,
  ApiTags,
} from '@nestjs/swagger';
import { CreateNotificationDto } from './dto/create-notification.dto';
import { NotificationsService } from './notifications.service';
import { NotificationDocument } from './schemas/notification.schema';

@ApiTags('Notifications')
@Controller('notifications')
export class NotificationsController {
  constructor(private readonly notificationsService: NotificationsService) {}

  @Get(':id')
  async findById(@Param('id') id: string) {
    try {
      return await this.notificationsService.findById(id);
    } catch (e) {
      throw new HttpException(e.message, 404);
    }
  }
  @ApiOkResponse({ description: 'Create new notification' })
  @ApiPreconditionFailedResponse({ description: 'Notification already exits' })
  @Post()
  async createNotification(
    @Body() notification: CreateNotificationDto,
  ): Promise<NotificationDocument> {
    return await this.notificationsService.create(notification);
  }
}
