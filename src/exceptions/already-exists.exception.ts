import { HttpException, HttpStatus } from '@nestjs/common';
import { MESSAGES } from '../util/messages';

export class AlreadyExistsException extends HttpException {
  constructor(message: string = MESSAGES.ALREADY_EXISTS) {
    super(message, HttpStatus.CONFLICT);
  }
}
