export interface IUser {
  id: string;
  email: string;
  username: string;
  password: string;
}

export interface TokenPayload {
  id: string;
  email: string;
}
