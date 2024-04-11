"use client";
import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";

const ListProducts = dynamic(() => import("@/components/common/ListProducts"));
import PageTitle from "@/components/common/PageTitle";

import Services from "@/services/products";
import { IProduct } from "../../interfaces";

const Products = () => {
  const [products, setProducts] = useState<IProduct[]>([]);

  useEffect(() => {
    getProducts();
  }, []);

  const getProducts = async () => {
    const resp = await Services.list();
    if (resp && resp.status && resp.data) {
      setProducts(resp.data);
    }
  };

  return (
    <div key={"all-products"}>
      <PageTitle title="All Products" />

      {products.length > 0 && <ListProducts products={products} />}
    </div>
  );
};

export default Products;
