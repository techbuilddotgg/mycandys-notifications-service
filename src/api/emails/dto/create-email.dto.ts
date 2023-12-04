import { PartialType } from '@nestjs/swagger';
import { CreateNotificationDto } from '../../notifications/dto/create-notification.dto';

export class CreateEmailDto extends PartialType(CreateNotificationDto) {}
