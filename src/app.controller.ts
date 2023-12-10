import { Controller, Get, UseGuards } from '@nestjs/common';
import { AppService } from './app.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from './auth/AuthGuard';

@ApiTags('health-check')
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('/health')
  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  getHealth(): { success: string } {
    return this.appService.getHealth();
  }
}
