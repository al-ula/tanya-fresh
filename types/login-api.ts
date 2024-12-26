export interface GoogleSigninBody {
  type: "google";
  id_token: string;
}

export interface EmailSigninBody {
  type: "email";
  email: string;
  password: string;
}

export type SigninBody = GoogleSigninBody | EmailSigninBody;
