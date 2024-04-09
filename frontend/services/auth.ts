import { LoginData } from "@/app/interfaces";
import request from "@/utils/request";

const login = (data: LoginData) => {
  return request.post(`auth/login`, data);
};

const register = (data: { email: string; password: string }) => {
  return request.post(`auth/register`, data);
};

export default { login, register };
