"use client";
import { Filters } from "@/components/Filters";
import { NotFoundIcon } from "@/components/Icons";
import { ProductList } from "@/components/Products/ProductList";
import { FilterHelper } from "@/helpers/FilterHelper";
import { IProduct } from "@/interfaces";
import { ProductService } from "@/services";
import { useEffect, useState } from "react";

export default function ProductsPage() {
  const [filters, setFilters] = useState({});
  const [productList, setProductList] = useState<IProduct[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const products = await ProductService.findAll();
      const filteresProducts = FilterHelper.filterData(products, filters);
      setProductList(filteresProducts);
    };

    fetchProducts();
  }, [filters]);

  return (
    <section className="flex gap-10 w-full">
      <Filters onChange={(e) => setFilters(e)} />
      <div className="w-full">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between w-full">
          <h1 className="text-xl lg:text-[28px] font-bold lg:pb-4">
            Todos os nossos produtos
          </h1>
          <p className="text-sm lg:text-lg text-neutral_11">
            +{productList.length} produtos
          </p>
        </div>
        <div className="grid grid-cols-2 xl:grid-cols-3 gap-3 lg:gap-5 w-full mt-6 lg:mt-0">
          {productList.length > 0 ? (
            <ProductList slice={999} products={productList} />
          ) : (
            <div className="w-full flex items-center justify-center col-start-2">
              <div className="flex flex-col items-center justify-center mt-[88px]">
                <NotFoundIcon />
                <h1 className="text-2xl font-semibold mt-8">
                  Nenhum item encontrado
                </h1>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
