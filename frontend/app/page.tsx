"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const ListProducts = dynamic(() => import("@/components/common/ListProducts"));

import { IProduct } from "@/interfaces";
import Services from "@/services/products";
import dynamic from "next/dynamic";
import AppLayout from "@/components/common/AppLayout";
import PageTitle from "@/components/common/PageTitle";

export default function Home() {
  const [products, setProducts] = useState<IProduct[]>([]);
  const router = useRouter();

  useEffect(() => {
    getProducts();
  }, []);

  const getProducts = async () => {
    const resp = await Services.list({ isLatest: true });
    if (resp && resp.status && resp.data) {
      setProducts(resp.data);
    }
  };

  return (
    <AppLayout key={"latest-arrivals"}>
      <div>
        <div className="flex items-center justify-between">
          <PageTitle title="Latest Arrivals" />
          <div
            className="text- cursor-pointer font-medium text-sm text-indigo-600 hover:text-indigo-500"
            onClick={() => {
              router.push("/products");
            }}
          >
            View all
          </div>
        </div>

        {products.length > 0 && <ListProducts products={products} />}
      </div>
    </AppLayout>
  );
}
