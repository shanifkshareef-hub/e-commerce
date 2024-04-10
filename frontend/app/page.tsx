"use client";
import AppLayout from "@/components/common/AppLayout";
import ListProducts from "@/components/common/ListProducts";
import PageTitle from "@/components/common/PageTitle";
import { IProduct } from "@/interfaces";
import { useEffect, useState } from "react";
import Services from "@/services/products";

export default function Home() {
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
    <AppLayout key={"latest-arrivals"}>
      <div>
        <PageTitle title="Latest Arrivals" />

        {products.length > 0 ? (
          <ListProducts products={products} />
        ) : (
          <>empty</>
        )}
      </div>
    </AppLayout>
  );
}
