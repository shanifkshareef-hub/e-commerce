export interface IUser {
  id: string;
  email: string;
  userName: string;
  password: string;
}

export interface TokenPayload {
  id: string;
  email: string;
}

export interface IProduct {
  name: string;
  price: number;
}
