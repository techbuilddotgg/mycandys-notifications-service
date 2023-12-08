import { Injectable } from '@nestjs/common';

@Injectable()
export class AuthService {
  async validate(token: string): Promise<any> {
    return true;
  }
}
