import { UnauthorizedException as CommonUnauthorizedException } from '@nestjs/common';
import { MESSAGES } from '../util/messages';

export class UnauthorizedException extends CommonUnauthorizedException {
  constructor(message: string = MESSAGES.UNAUTHORIZED) {
    super(message);
  }
}
