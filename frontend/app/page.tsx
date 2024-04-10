"use client";
import AppLayout from "@/components/common/AppLayout";
import ListProducts from "@/components/common/ListProducts";
import PageTitle from "@/components/common/PageTitle";
import { IProduct } from "@/interfaces";
import { useEffect, useState } from "react";
import Services from "@/services/products";
import { useRouter } from "next/navigation";

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

        {products.length > 0 ? (
          <ListProducts products={products} />
        ) : (
          <>empty</>
        )}
      </div>
    </AppLayout>
  );
}
