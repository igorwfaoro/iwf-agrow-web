import { IsEmail, IsNotEmpty } from 'class-validator';

export class UserRegisterInputModel {
  @IsNotEmpty()
  public name: string;

  @IsNotEmpty()
  @IsEmail()
  public email: string;

  @IsNotEmpty()
  public password: string;
}
