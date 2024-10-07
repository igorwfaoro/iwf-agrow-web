import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { UserJwt } from '../models/common/user-jwt';

export const User = createParamDecorator(
  (data: unknown, ctx: ExecutionContext): UserJwt => {
    const request = ctx.switchToHttp().getRequest();
    return request.user;
  }
);
