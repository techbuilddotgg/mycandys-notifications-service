import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiPreconditionFailedResponse,
  ApiTags,
} from '@nestjs/swagger';
import { CreateNotificationDto } from './dto/create-notification.dto';
import { NotificationsService } from './notifications.service';
import { NotificationDocument } from './schemas/notification.schema';
import { UpdateNotificationDto } from './dto/update-notification.dto';
import { CreateActionNotificationDto } from './dto/create-action-notification.dto';
import { AuthGuard } from '../../auth/AuthGuard';

@ApiTags('Notifications')
@Controller('notifications')
export class NotificationsController {
  constructor(private readonly notificationsService: NotificationsService) {}

  @ApiOkResponse({ description: 'Retrieves notification' })
  @ApiNotFoundResponse({ description: 'Notification not found' })
  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @Get(':id')
  async findById(@Param('id') id: string) {
    try {
      return await this.notificationsService.findById(id);
    } catch (e) {
      throw new HttpException(e.message, 404);
    }
  }

  @ApiOkResponse({ description: 'Delete notification' })
  @ApiNotFoundResponse({ description: 'Notification not found' })
  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @Delete()
  async delete(@Param('id') id: string): Promise<boolean> {
    try {
      return await this.notificationsService.delete(id);
    } catch (e) {
      throw new HttpException(e.message, 404);
    }
  }

  @ApiOkResponse({ description: 'Retrieves all notifications' })
  @ApiNotFoundResponse({ description: 'Notifications not found' })
  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @Get()
  async findAll() {
    try {
      return await this.notificationsService.findAll();
    } catch (e) {
      throw new HttpException(e.message, 404);
    }
  }
  @ApiOkResponse({ description: 'Create new notification' })
  @ApiPreconditionFailedResponse({ description: 'Notification already exits' })
  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @Post()
  async createNotification(
    @Body() notification: CreateNotificationDto,
  ): Promise<NotificationDocument> {
    try {
      return await this.notificationsService.create(notification);
    } catch (e) {
      throw new HttpException(e.message, 412);
    }
  }

  @ApiOkResponse({ description: 'Updates notification' })
  @ApiNotFoundResponse({ description: 'Notification not found' })
  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @Patch()
  async update(
    @Body() notification: UpdateNotificationDto,
    @Param('id') id: string,
  ): Promise<NotificationDocument> {
    try {
      return await this.notificationsService.update(id, notification);
    } catch (e) {
      throw new HttpException(e.message, 404);
    }
  }

  @ApiOkResponse({ description: 'Notify action' })
  @ApiNotFoundResponse({ description: 'Notification action not found' })
  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @Post('notify_action')
  async notify_action(
    @Body() notification: CreateActionNotificationDto,
  ): Promise<CreateActionNotificationDto> {
    try {
      return await this.notificationsService.notify_action(notification);
    } catch (e) {
      throw new HttpException(e.message, 404);
    }
  }
}
