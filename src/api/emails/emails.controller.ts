import { EmailsService } from './emails.service';
import { Controller, Get, HttpException, Post } from '@nestjs/common';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Emails')
@Controller('emails')
export class EmailsController {
  constructor(private readonly emailsService: EmailsService) {}

  @ApiOkResponse({ description: 'Created new email' })
  @Post()
  async createEmail() {
    try {
      return await this.emailsService.create();
    } catch (e) {
      throw new HttpException(e.message, 404);
    }
  }

  @ApiOkResponse({ description: 'SENDING EMAIL' })
  @Get()
  async example() {
    try {
      return await this.emailsService.example();
    } catch (e) {
      throw new HttpException(e.message, 404);
    }
  }
}
