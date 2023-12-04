import { EmailsService } from './emails.service';
import { Body, Controller, HttpException, Post } from '@nestjs/common';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { CreateEmailDto } from './dto/create-email.dto';

@ApiTags('Emails')
@Controller('emails')
export class EmailsController {
  constructor(private readonly emailsService: EmailsService) {}

  @ApiOkResponse({ description: 'Sent new email' })
  @Post()
  async createEmail(@Body() emailData: CreateEmailDto) {
    try {
      return await this.emailsService.sendEmail(emailData);
    } catch (e) {
      throw new HttpException(e.message, 404);
    }
  }
}
