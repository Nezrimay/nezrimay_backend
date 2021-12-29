import {
  CanActivate,
  ExecutionContext,
  HttpException,
  HttpStatus,
} from '@nestjs/common';

export class AuthGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest<any>();

    if (request.user) {
      return true;
    }
    throw new HttpException('Not authorize', HttpStatus.UNAUTHORIZED);
  }
}
