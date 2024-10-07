import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { AlreadyExistsException } from '../exceptions/already-exists.exception';
import { UserJwt } from '../models/common/user-jwt';
import { User } from '../models/documents/user';
import { UserAuthenticateInputModel } from '../models/input-models/user-authenticate.input-model';
import { UserRegisterInputModel } from '../models/input-models/user-register.input-model';
import { UserAuthViewModel } from '../models/view-models/user-auth.view-model';
import { UserViewModel } from '../models/view-models/user.view-model';
import { MESSAGES } from '../util/messages';

@Injectable()
export class AuthService {
  constructor(private readonly jwtService: JwtService) {}

  public async register(
    input: UserRegisterInputModel
  ): Promise<UserAuthViewModel> {
    if (await User.repository().whereEqualTo('email', input.email).findOne())
      throw new AlreadyExistsException(MESSAGES.USER_WITH_EMAIL_ALREADY_EXISTS);

    const user = User.create(input);

    const newUser = await User.repository().create(user);

    return UserAuthViewModel.create({
      user: UserViewModel.fromDocument(newUser),
      token: this.buildToken(user)
    });
  }

  public async authenticate(
    input: UserAuthenticateInputModel
  ): Promise<UserAuthViewModel> {
    const user = await User.repository()
      .whereEqualTo('email', input.email)
      .findOne();

    if (!user || !bcrypt.compareSync(input.password, user.password))
      throw new UnauthorizedException(MESSAGES.INVALID_EMAIL_OR_PASSWORD);

    return UserAuthViewModel.create({
      user: UserViewModel.fromDocument(user),
      token: this.buildToken(user)
    });
  }

  private buildToken(user: User): string {
    return this.jwtService.sign(UserJwt.fromDocument(user).toPlain());
  }
}
