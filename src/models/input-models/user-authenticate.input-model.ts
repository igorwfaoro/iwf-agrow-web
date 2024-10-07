import { IsEmail, IsNotEmpty } from 'class-validator';

export class UserAuthenticateInputModel {
  @IsNotEmpty()
  @IsEmail()
  public email: string;

  @IsNotEmpty()
  public password: string;
}
