import * as bcrypt from 'bcrypt';
import * as dayjs from 'dayjs';
import { Collection, getRepository } from 'fireorm';
import { USER_PASSWORD_HASH_SALT } from '../../util/constants';

@Collection('users')
export class User {
  public id: string;
  public name: string;
  public email: string;
  public password: string;
  public createdAt: string;

  public static repository() {
    return getRepository(User);
  }

  public static create(props: {
    name: string;
    email: string;
    password: string;
  }): User {
    const user = new User();

    user.name = props.name;
    user.email = props.email;
    user.password = bcrypt.hashSync(props.password, USER_PASSWORD_HASH_SALT);
    user.createdAt = dayjs().toISOString();

    return user;
  }
}
