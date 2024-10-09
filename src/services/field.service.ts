import { API_URLS } from '../http/api-urls';
import { http } from '../http/http';
import { Field } from '../models/api/field';
import { FieldDto } from '../models/dto/field.dto';

export const useFieldService = () => {
  const list = (): Promise<Field[]> =>
    http()
      .get(API_URLS.fields.list())
      .then((response) => response.data);

  const get = (id: string): Promise<Field> =>
    http()
      .get(API_URLS.fields.get(id))
      .then((response) => response.data);

  const create = (dto: FieldDto): Promise<Field> =>
    http()
      .post(API_URLS.fields.create(), dto)
      .then((response) => response.data);

  const update = (id: string, dto: FieldDto): Promise<Field> =>
    http()
      .put(API_URLS.fields.update(id), dto)
      .then((response) => response.data);

  const remove = (id: string): Promise<void> =>
    http()
      .delete(API_URLS.fields.remove(id))
      .then((response) => response.data);

  return {
    list,
    get,
    create,
    update,
    remove
  };
};
