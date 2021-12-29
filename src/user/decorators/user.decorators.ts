import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const User = createParamDecorator((data: any, ctx: ExecutionContext) => {
  // TODO: change any for Request
  const request = ctx.switchToHttp().getRequest<any>();

  if (!request.user) {
    return null;
  }

  if (data) {
    return request.user[data];
  }
  return request.user;
});
