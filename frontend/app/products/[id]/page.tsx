"use client";
import { IProduct } from "@/interfaces";
import { dayjs, generateRandom } from "@/utils/helpers";
import React, { useEffect, useState } from "react";
import Services from "@/services/products";
import { FaChevronLeft } from "react-icons/fa6";
import { useRouter } from "next/navigation";
import Image from "next/image";
import pattern1 from "@/assets/1.png";
import pattern2 from "@/assets/2.png";
import pattern3 from "@/assets/3.png";
import pattern4 from "@/assets/4.png";

const Details = ({ params: { id } }: { params: { id: string } }) => {
  const [product, setProduct] = useState<IProduct>();
  const router = useRouter();

  useEffect(() => {
    getProduct();
  }, []);

  const getProduct = async () => {
    if (!id) return;
    const resp = await Services.getOne(id);
    if (resp && resp.status && resp.data) {
      setProduct(resp.data);
    }
  };

  const images = [pattern1, pattern2, pattern3, pattern4];

  const imageIndex = generateRandom(1, 4);

  return (
    <div>
      <div className="font-semibold text-gray-200 flex space-x-1 items-center text-2xl pb-4">
        <FaChevronLeft
          onClick={() => {
            router.push("/products");
          }}
          className="text-xl cursor-pointer "
        />
        <p>Product Details</p>
      </div>
      {product && (
        <div className="bg-gray-800">
          <div className="pt-6">
            <div className="mx-auto max-w-7xl px-4 pb-16 pt-10 sm:px-6 grid grid-cols-9">
              <div className="col-span-6 flex justify-between w-fill">
                <Image
                  src={images[imageIndex - 1]}
                  alt="pattern"
                  width={300}
                  height={300}
                  className="rounded-md"
                />
                <div className="py-4 px-8 text-right space-y-6 h-full flex flex-col">
                  <div className="flex-1 space-y-6">
                    <p className="text-2xl font-bold tracking-tight text-gray-200 sm:text-3xl">
                      {product.title}
                    </p>

                    {product.description && (
                      <p className="text-base text-gray-200">
                        {product.description}
                      </p>
                    )}
                    <p className="text-3xl text-gray-200">
                      {`₹${product.price} / piece`}
                    </p>
                  </div>

                  <div className="w-fit ml-auto">
                    <button className="w-52 flex cursor-default mt-6 justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                      Buy
                    </button>
                  </div>
                </div>
              </div>

              <div className="mt-4 col-span-3 border-l border-gray-700 pl-8">
                <div className="text-gray-200 text-sm">
                  <h3 className="text-base font-medium ">Created At</h3>
                  <p className="">{dayjs(product.createdAt).format("lll")}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Details;
