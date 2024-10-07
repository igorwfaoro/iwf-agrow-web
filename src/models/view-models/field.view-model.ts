import { CoordinatePoint, Field } from '../documents/field';
import { User } from '../documents/user';
import { UserViewModel } from './user.view-model';

export class FieldViewModel {
  public id: string;
  public name: string;
  public culture: string;
  public icon: string;
  public color: string;
  public areaPolygon: CoordinatePoint[];
  public createdAt: string;

  public userId: string;
  public user?: UserViewModel;

  public static fromDocument(doc: Field & { user?: User }): FieldViewModel {
    const viewModel = new FieldViewModel();

    viewModel.id = doc.id;
    viewModel.name = doc.name;
    viewModel.culture = doc.culture;
    viewModel.icon = doc.icon;
    viewModel.color = doc.color;
    viewModel.areaPolygon = doc.areaPolygon;
    viewModel.createdAt = doc.createdAt;

    viewModel.userId = doc.userId;
    viewModel.user = doc.user
      ? UserViewModel.fromDocument(doc.user)
      : undefined;

    return viewModel;
  }
}
