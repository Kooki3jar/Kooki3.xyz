export interface GoogleUser {
  id: string;
  email: string;
  name: string;
  picture: string;
  givenName: string;
  familyName: string;
  accessToken?: string;
}

export interface AuthError {
  code: string;
  message: string;
  details?: any;
}