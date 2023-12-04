import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import {
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiPreconditionFailedResponse,
  ApiTags,
} from '@nestjs/swagger';
import { CreateNotificationDto } from './dto/create-notification.dto';
import { NotificationsService } from './notifications.service';
import { NotificationDocument } from './schemas/notification.schema';
import { UpdateNotificationDto } from './dto/update-notification.dto';

@ApiTags('Notifications')
@Controller('notifications')
export class NotificationsController {
  constructor(private readonly notificationsService: NotificationsService) {}

  @ApiOkResponse({ description: 'Retrieves notification' })
  @ApiNotFoundResponse({ description: 'Notification not found' })
  @Get(':id')
  async findById(@Param('id') id: string) {
    try {
      return await this.notificationsService.findById(id);
    } catch (e) {
      throw new HttpException(e.message, 404);
    }
  }

  @ApiOkResponse({ description: 'Retrieves all notifications' })
  @ApiNotFoundResponse({ description: 'Notifications not found' })
  @Get()
  async findAll() {
    return await this.notificationsService.findAll();
  }
  @ApiOkResponse({ description: 'Create new notification' })
  @ApiPreconditionFailedResponse({ description: 'Notification already exits' })
  @Post()
  async createNotification(
    @Body() notification: CreateNotificationDto,
  ): Promise<NotificationDocument> {
    return await this.notificationsService.create(notification);
  }

  @ApiOkResponse({ description: 'Updates notification' })
  @ApiNotFoundResponse({ description: 'Notification not found' })
  @Patch()
  async update(
    @Body() notification: UpdateNotificationDto,
    @Param('id') id: string,
  ): Promise<NotificationDocument> {
    return await this.notificationsService.update(id, notification);
  }

  @ApiOkResponse({ description: 'Delete notification' })
  @ApiNotFoundResponse({ description: 'Notification not found' })
  @Delete()
  async delete(@Param('id') id: string): Promise<boolean> {
    return await this.notificationsService.delete(id);
  }
}
