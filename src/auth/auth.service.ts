import { Injectable, UnauthorizedException } from '@nestjs/common';
import process from 'process';
import { HttpService } from '@nestjs/axios';

@Injectable()
export class AuthService {
  constructor(private readonly httpService: HttpService) {}

  async validate(token: string): Promise<any> {
    const authMicroservice = process.env.AUTH_SERVICE;

    try {
      const { data: response } = await this.httpService.axiosRef.get(
        `${authMicroservice}/auth/verify`,
        { headers: { Authorization: `${token}` } },
      );
    } catch (e) {
      throw new UnauthorizedException();
    }
    return true;
  }
}
