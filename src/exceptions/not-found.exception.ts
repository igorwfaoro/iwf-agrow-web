import { NotFoundException as CommonNotFoundException } from '@nestjs/common';
import { MESSAGES } from '../util/messages';

export class NotFoundException extends CommonNotFoundException {
  constructor(message: string = MESSAGES.NOT_FOUND) {
    super(message);
  }
}
