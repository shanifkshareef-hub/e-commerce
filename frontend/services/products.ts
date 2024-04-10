import { IProduct, Resp } from "@/interfaces";
import request from "@/utils/request";

const list = () => {
  return request.get(`products`);
};

const getOne = (id: string): Promise<Resp<IProduct>> => {
  return request.get(`products/${id}`);
};

export default { list, getOne };
