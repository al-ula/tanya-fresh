export interface GoogleSignupBody {
  type: "google";
  name: string;
  id_token: string;
}

export interface EmailSignupBody {
  type: "email";
  name: string;
  email: string;
  password: string;
}

export type SignupBody = GoogleSignupBody | EmailSignupBody;
