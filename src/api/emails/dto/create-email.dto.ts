import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateNotificationDto } from '../../notifications/dto/create-notification.dto';
import { IsString } from 'class-validator';

export class CreateEmailDto extends PartialType(CreateNotificationDto) {
  @ApiProperty({ required: true })
  @IsString()
  user: string;
}
