import { API_URLS } from '../constants/api-urls';
import { http } from '../http/http';
import { CardInputModel } from '../models/input-models/card.input-model';
import { CardViewModel } from '../models/view-models/card.view-model';
import { CreateCardResultViewModel } from '../models/view-models/create-card-result.view-model';

export const useCardService = () => {
  const getBySlug = (slug: string): Promise<CardViewModel> =>
    http()
      .get(API_URLS.card.getBySlug(slug))
      .then((response) => response.data);

  const create = (data: CardInputModel): Promise<CreateCardResultViewModel> =>
    http()
      .post(API_URLS.card.create(), data)
      .then((response) => response.data);

  return {
    getBySlug,
    create
  };
};
