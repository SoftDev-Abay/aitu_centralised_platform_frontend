type LoginResponce = {
  accessToken: string;
  expiresInSec: number;
  refreshToken: string;
};
type LoginInput = {
  password: string;
  email: string;
};

export type { LoginInput, LoginResponce };
