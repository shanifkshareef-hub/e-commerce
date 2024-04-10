import { IProduct } from "@/interfaces";
import React from "react";

export interface IProductCard {
  product: IProduct;
}
const ProductCard: React.FC<IProductCard> = ({ product }) => {
  return (
    <div className="group relative bg-gray-800 rounded-md p-4">
      <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-80">
        <img
          src="https://tailwindui.com/img/ecommerce-images/product-page-01-related-product-01.jpg"
          alt="Front of men&#039;s Basic Tee in black."
          className="h-full w-full object-cover object-center lg:h-full lg:w-full"
        />
      </div>
      <div className="mt-4 flex justify-between">
        <div>
          <h3 className="text-sm text-gray-300">
            <a href="#">
              <span aria-hidden="true" className="absolute inset-0"></span>
              {product.title}
            </a>
          </h3>
          <p className="mt-1 text-sm text-gray-400"> {product.description}</p>
        </div>
        <p className="text-sm font-medium text-gray-300">{`₹ ${product.price}`}</p>
      </div>
    </div>
  );
};

export default ProductCard;
