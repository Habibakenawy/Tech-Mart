export interface LoginResponse {
  token: string;
  user: {
    id: string;
    email: string;
  };
}

export interface ForgotPasswordResponse {
  message: string;
}

export interface ResetPasswordResponse {
  token: string;
}

export interface VerifyResetCodeResponse {
  status: string;
}
