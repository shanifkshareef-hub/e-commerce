import {
  IUser,
  LoginData,
  LoginResponse,
  RegisterData,
  Resp,
} from "@/interfaces";
import request from "@/utils/request";

const login = (data: LoginData): Promise<Resp<LoginResponse>> => {
  return request.post(`auth/login`, data);
};

const register = (data: {
  email: string;
  password: string;
}): Promise<Resp<IUser>> => {
  return request.post(`auth/register`, data);
};

const getPk = (): Promise<Resp<string>> => {
  return request.get(`auth/pk`);
};

export default { login, register, getPk };
