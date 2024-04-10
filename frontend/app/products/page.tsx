"use client";
import React, { useEffect, useState } from "react";
import Services from "@/services/products";
import { IProduct } from "../../interfaces";
import ListProducts from "@/components/common/ListProducts";

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
    <div>
      {products.length > 0 ? <ListProducts products={products} /> : <>empty</>}
    </div>
  );
};

export default Products;
