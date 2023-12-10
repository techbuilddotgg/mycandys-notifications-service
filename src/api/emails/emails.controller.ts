import { EmailsService } from './emails.service';
import {
  Body,
  Controller,
  HttpException,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { CreateEmailDto } from './dto/create-email.dto';
import { AuthGuard } from '../../auth/AuthGuard';

@ApiTags('Emails')
@Controller('emails')
export class EmailsController {
  constructor(private readonly emailsService: EmailsService) {}

  @ApiOkResponse({ description: 'Sent new email' })
  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @Post()
  async createEmail(@Body() emailData: CreateEmailDto) {
    try {
      return await this.emailsService.sendMail(emailData);
    } catch (e) {
      throw new HttpException(e.message, 404);
    }
  }
}
