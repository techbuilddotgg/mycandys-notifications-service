import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { HttpService } from '@nestjs/axios';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly httpService: HttpService) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    try {
      const { data: response } = await this.httpService.axiosRef.get(
        `${process.env.AUTH_SERVICE}/auth/verify`,
        {
          headers: {
            Authorization: request.headers.authorization.split(' ')[1],
          },
        },
      );
      if (response.userId) {
        return true;
      }
    } catch (e) {
      throw new UnauthorizedException('Unauthorized');
    }
    return false;
  }
}
