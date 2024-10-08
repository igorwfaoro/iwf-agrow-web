import { User } from './user';

export interface UserAuth {
  user: User;
  token: string;
}
