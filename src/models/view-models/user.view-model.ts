import { User } from '../documents/user';

export class UserViewModel {
  public id: string;
  public name: string;
  public email: string;
  public createdAt: string;

  public static fromDocument(doc: User): UserViewModel {
    const viewModel = new UserViewModel();

    viewModel.id = doc.id;
    viewModel.name = doc.name;
    viewModel.email = doc.email;
    viewModel.createdAt = doc.createdAt;

    return viewModel;
  }
}
