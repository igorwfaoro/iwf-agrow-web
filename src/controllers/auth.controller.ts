import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { Public } from '../decorators/public';
import { UserAuthenticateInputModel } from '../models/input-models/user-authenticate.input-model';
import { UserRegisterInputModel } from '../models/input-models/user-register.input-model';
import { UserAuthViewModel } from '../models/view-models/user-auth.view-model';
import { AuthService } from '../services/auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  @HttpCode(HttpStatus.CREATED)
  @Public()
  public register(
    @Body() input: UserRegisterInputModel
  ): Promise<UserAuthViewModel> {
    return this.authService.register(input);
  }

  @Post('authenticate')
  @HttpCode(HttpStatus.OK)
  @Public()
  public authenticate(
    @Body() input: UserAuthenticateInputModel
  ): Promise<UserAuthViewModel> {
    return this.authService.authenticate(input);
  }
}
