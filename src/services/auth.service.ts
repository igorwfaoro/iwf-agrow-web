import { API_URLS } from '../http/api-urls';
import { http } from '../http/http';
import { UserAuth } from '../models/api/user-auth';
import { LoginDto } from '../models/dto/login.dto';
import { UserRegisterDto } from '../models/dto/user-register.dto';

export const useAuthService = () => {
  const authenticate = (dto: LoginDto): Promise<UserAuth> =>
    http({ ignoreLoginRedirect: true })
      .post(API_URLS.auth.authenticate(), dto)
      .then((response) => response.data);

  const register = (dto: UserRegisterDto): Promise<UserAuth> =>
    http({ ignoreLoginRedirect: true })
      .post(API_URLS.auth.register(), dto)
      .then((response) => response.data);

  const refresh = (): Promise<UserAuth> =>
    http()
      .post(API_URLS.auth.refresh())
      .then((response) => response.data);

  return {
    authenticate,
    register,
    refresh
  };
};
