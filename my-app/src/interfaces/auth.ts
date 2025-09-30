export interface LoginResponse {
  token: string;
  message:string;
  user: {
    name: string;
    email: string;
    role:string;
  };
}

export interface ForgotPasswordResponse {
  statusMsg: string;
  message:string;
}

export interface ResetPasswordResponse {
  token: string;
}

export interface VerifyResetCodeResponse {
  status: string;
}
