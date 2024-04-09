import request from "@/utils/request";

const list = () => {
  return request.get(`products`);
};

const getOne = (id: string) => {
  return request.get(`products/${id}`);
};

// const getFe = (id: string) => {
//     return request.get(`products/${id}`);
// };

export default { list, getOne };
