import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Put
} from '@nestjs/common';
import { User } from '../decorators/user';
import { UserJwt } from '../models/common/user-jwt';
import { FieldInputModel } from '../models/input-models/field.input-model';
import { FieldViewModel } from '../models/view-models/field.view-model';
import { FieldService } from '../services/field.service';

@Controller('fields')
export class FieldsController {
  constructor(private readonly fieldService: FieldService) {}

  @Get()
  public list(@User() user: UserJwt): Promise<FieldViewModel[]> {
    return this.fieldService.list(user.id);
  }

  @Get(':id')
  public get(
    @User() user: UserJwt,
    @Param() params: { id: string }
  ): Promise<FieldViewModel> {
    return this.fieldService.get(user.id, params.id);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  public create(
    @User() user: UserJwt,
    @Body() input: FieldInputModel
  ): Promise<FieldViewModel> {
    return this.fieldService.create(user.id, input);
  }

  @Put(':id')
  public update(
    @User() user: UserJwt,
    @Param() params: { id: string },
    @Body() input: FieldInputModel
  ): Promise<FieldViewModel> {
    return this.fieldService.update(user.id, params.id, input);
  }

  @Delete(':id')
  public remove(
    @User() user: UserJwt,
    @Param() params: { id: string }
  ): Promise<void> {
    return this.fieldService.remove(user.id, params.id);
  }
}
