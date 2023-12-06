import { Injectable, UnauthorizedException } from '@nestjs/common';

@Injectable()
export class AuthService {
  constructor() {}

  async validate(): Promise<any> {
    //TODO: get token from auth microservice
    const token = 'token';
    if (!token) {
      throw new UnauthorizedException();
    }
    return true;
  }
}
