export interface LoginData {
  email: string;
  password: string;
}

export interface RegisterData {
  userName: string;
  email: string;
  password: string;
}

export interface Resp<T> {
  status: boolean;
  data: T;
}

export interface IUser {
  id: string;
  userName: string;
  email: string;
  password: string;
}
export interface LoginResponse {
  user: IUser;
  token: string;
}

export interface IProduct {
  _id: string;
  title: string;
  description: string;
  price: number;
  createdAt: string;
  updatedAt: string;
}
