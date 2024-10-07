import { ForbiddenException as CommonForbiddenException } from '@nestjs/common';
import { MESSAGES } from '../util/messages';

export class ForbiddenException extends CommonForbiddenException {
  constructor(message: string = MESSAGES.FORBIDDEN) {
    super(message);
  }
}
