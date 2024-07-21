import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { config } from 'src/config';

@Injectable()
export class ApiKeyGuard implements CanActivate {
  constructor() {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req = context.switchToHttp().getRequest();

    const apiKey = req.headers['x-apikey'];

    if (!apiKey) {
      throw new UnauthorizedException(
        'You are not allowed to access this resource!',
      );
    }

    const canAccess = config.API_SECRET_KEY === apiKey;

    if (!canAccess) {
      throw new UnauthorizedException(
        'You are not allowed to access this resource!',
      );
    }

    return canAccess;
  }
}
