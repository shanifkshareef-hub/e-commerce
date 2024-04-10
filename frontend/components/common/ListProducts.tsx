import { IProduct } from "@/interfaces";
import React from "react";
import ProductCard from "./ProductCard";

export interface IListProducts {
  products: IProduct[];
}
const ListProducts: React.FC<IListProducts> = ({ products }) => {
  return (
    <div className="grid grid-cols-4 gap-4">
      {products.map((obj, i) => (
        <ProductCard product={obj} key={`product-${i}`} />
      ))}
    </div>
  );
};

export default ListProducts;
