import { UserViewModel } from './user.view-model';

export class UserAuthViewModel {
  public user: UserViewModel;
  public token: string;

  public static create(props: {
    user: UserViewModel;
    token: string;
  }): UserAuthViewModel {
    const model = new UserAuthViewModel();

    model.user = props.user;
    model.token = props.token;

    return model;
  }
}
