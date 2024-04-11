"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { IProduct } from "@/interfaces";
import dynamic from "next/dynamic";

const ProductDetails = dynamic(
  () => import("@/components/common/ProductDetails")
);
import PageTitle from "@/components/common/PageTitle";

import Services from "@/services/products";

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

  return (
    <div>
      <PageTitle
        title="Product Details"
        onBack={() => {
          router.push("/products");
        }}
      />

      {product && <ProductDetails product={product} />}
    </div>
  );
};

export default Details;
