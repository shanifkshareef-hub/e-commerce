import { IProduct, Resp } from "@/interfaces";
import request from "@/utils/request";

const list = (params?: { isLatest: boolean }) => {
  return request.get(`products`, { params });
};

const getOne = (id: string): Promise<Resp<IProduct>> => {
  return request.get(`products/${id}`);
};

export default { list, getOne };
