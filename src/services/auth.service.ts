import { API_URLS } from '../constants/api-urls';
import { http } from '../http/http';
import { UserAuth } from '../models/api/user-auth';
import { LoginDto } from '../models/dto/login.dto';
import { UserRegisterDto } from '../models/dto/user-register.dto';

export const useAuthService = () => {
  const authenticate = (dto: LoginDto): Promise<UserAuth> =>
    http()
      .post(API_URLS.auth.authenticate(), dto)
      .then((response) => response.data);

  const register = (dto: UserRegisterDto): Promise<UserAuth> =>
    http()
      .post(API_URLS.auth.register(), dto)
      .then((response) => response.data);

  return {
    authenticate,
    register
  };
};
