import { Injectable } from '@nestjs/common';
import { NotFoundException } from '../exceptions/not-found.exception';
import { Field } from '../models/documents/field';
import { FieldInputModel } from '../models/input-models/field.input-model';
import { FieldViewModel } from '../models/view-models/field.view-model';
import { MESSAGES } from '../util/messages';

@Injectable()
export class FieldService {
  public async list(userId: string): Promise<FieldViewModel[]> {
    const fields = await Field.repository()
      .whereEqualTo('userId', userId)
      .orderByAscending('culture')
      .orderByAscending('name')
      .find();

    return fields.map(FieldViewModel.fromDocument);
  }

  public async get(userId: string, id: string): Promise<FieldViewModel> {
    const field = await Field.repository()
      .whereEqualTo('userId', userId)
      .whereEqualTo('id', id)
      .findOne();

    if (!field) throw new NotFoundException(MESSAGES.FIELD_NOT_FOUND);

    return FieldViewModel.fromDocument(field);
  }

  public async create(
    userId: string,
    input: FieldInputModel
  ): Promise<FieldViewModel> {
    const field = Field.create({ ...input, userId });
    console.log(JSON.stringify(field, null, 2));

    const newField = await Field.repository().create(field);
    return FieldViewModel.fromDocument(newField);
  }

  public async update(
    userId: string,
    id: string,
    input: FieldInputModel
  ): Promise<FieldViewModel> {
    const field = await Field.repository()
      .whereEqualTo('userId', userId)
      .whereEqualTo('id', id)
      .findOne();

    if (!field) throw new NotFoundException(MESSAGES.FIELD_NOT_FOUND);

    field.name = input.name;
    field.culture = input.culture;
    field.icon = input.icon;
    field.color = input.color;
    field.areaPolygon = input.areaPolygon;

    const updatedField = await Field.repository().update(field);

    return FieldViewModel.fromDocument(updatedField);
  }

  public async remove(userId: string, id: string): Promise<void> {
    const field = await Field.repository()
      .whereEqualTo('userId', userId)
      .whereEqualTo('id', id)
      .findOne();

    if (!field) throw new NotFoundException(MESSAGES.FIELD_NOT_FOUND);

    await Field.repository().delete(field.id);
  }
}
