import {
  ArgumentMetadata,
  BadRequestException,
  Injectable,
  PipeTransform
} from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';
import { MESSAGES } from '../util/messages';

@Injectable()
export class CustomValidationPipe implements PipeTransform<any> {
  async transform(value: any, { metatype }: ArgumentMetadata) {
    if (!metatype || !this.toValidate(metatype)) {
      return value;
    }

    // Transform the incoming value into an instance of the expected class
    const object = plainToInstance(metatype, value);

    // Validate the object
    const errors = await validate(object, {
      whitelist: true, // Remove properties not defined in DTO
      forbidNonWhitelisted: true, // Throw error if extra properties exist
      transform: true // Automatically transform plain objects to class instances
    });

    if (errors.length > 0) {
      const errorMessages = errors
        .map((err) => {
          return this.buildErrorMessages(err);
        })
        .flat(); // Flatten the array if there are multiple errors
      throw new BadRequestException(errorMessages);
    }

    return object; // Return the transformed value
  }

  private toValidate(metatype: Function): boolean {
    const types: Function[] = [String, Boolean, Number, Array, Object];
    return !types.includes(metatype);
  }

  private buildErrorMessages(error: any): string[] {
    return Object.keys(error.constraints).map((constraintKey) => {
      let messageTemplate = MESSAGES.CLASS_VALIDATOR[constraintKey];
      if (messageTemplate) {
        messageTemplate = this.replacePlaceholders(
          messageTemplate,
          error,
          constraintKey
        );
      } else {
        messageTemplate = error.constraints[constraintKey];
      }
      return messageTemplate;
    });
  }

  private replacePlaceholders(
    template: string,
    error: any,
    constraintKey: string
  ): string {
    template = template.replace('$property', error.property);
    const constraints =
      error.contexts?.[constraintKey] || error.constraints[constraintKey];
    if (Array.isArray(constraints)) {
      constraints.forEach((constraint, index) => {
        template = template.replace(
          `$constraint${index + 1}`,
          constraint.toString()
        );
      });
    } else {
      template = template.replace('$constraint1', constraints);
    }
    return template;
  }
}
