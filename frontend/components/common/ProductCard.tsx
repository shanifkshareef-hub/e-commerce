import { IProduct } from "@/interfaces";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";
import pattern1 from "@/assets/1.png";
import pattern2 from "@/assets/2.png";
import pattern3 from "@/assets/3.png";
import pattern4 from "@/assets/4.png";
import { generateRandom } from "@/utils/helpers";

export interface IProductCard {
  product: IProduct;
}
const ProductCard: React.FC<IProductCard> = ({ product }) => {
  const router = useRouter();
  const images = [pattern1, pattern2, pattern3, pattern4];

  const imageIndex = generateRandom(1, 4);

  return (
    <div
      className="group relative bg-gray-900 rounded-md p-4"
      onClick={() => {
        router.push(`products/${product._id}`);
      }}
    >
      <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-80">
        <Image
          src={images[imageIndex - 1]}
          alt="pattern"
          style={{ height: "100%", width: "100%" }}
          width={400}
          height={400}
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
        <p className="text-sm font-medium text-gray-300 min-w-10">{`₹ ${product.price}`}</p>
      </div>
    </div>
  );
};

export default ProductCard;
