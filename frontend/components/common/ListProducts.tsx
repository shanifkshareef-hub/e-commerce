import { IProduct } from "@/interfaces";
import React from "react";
import ProductCard from "./ProductCard";

export interface IListProducts {
  products: IProduct[];
}
const ListProducts: React.FC<IListProducts> = ({ products }) => {
  return (
    <div>
      <div className="">
        <h2 className="text-2xl font-bold tracking-tight text-gray-200">
          Products
        </h2>
      </div>
      <div className="grid grid-cols-4 gap-4 mt-2">
        {products.map((obj, i) => (
          <ProductCard product={obj} key={`product-${i}`} />
        ))}
      </div>
    </div>
  );
};

export default ListProducts;
