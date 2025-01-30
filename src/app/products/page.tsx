"use client";
import { Filters } from "@/components/Filters";
import { NotFoundIcon } from "@/components/Icons";
import { Pagination } from "@/components/Pagination";
import { ProductList } from "@/components/Products/ProductList";
import { FilterHelper } from "@/helpers/FilterHelper";
import { IProduct } from "@/interfaces";
import { ProductService } from "@/services";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function ProductsPage() {
  const searchParams = useSearchParams();
  const [allProducts, setAllProducts] = useState<IProduct[]>([]);
  const [page, setPage] = useState("1");
  const itemsPerPage = 50;
  
  const [filters, setFilters] = useState(() => {
    const categorieParam = searchParams.get("categorie");
    return categorieParam ? { categorie: categorieParam } : {};
  });

  useEffect(() => {
    const fetchProducts = async () => {
      const products = await ProductService.findAll("1", "999999");
      const filteredProducts = FilterHelper.filterData(products, filters);
      setAllProducts(filteredProducts);
    };

    fetchProducts();
  }, [filters]);

  // Calcula os produtos da página atual
  const getCurrentPageProducts = () => {
    const startIndex = (Number(page) - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return allProducts.slice(startIndex, endIndex);
  };

  const handlePageChange = (newPage: number) => {
    setPage(newPage.toString());
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <section className="flex gap-10 w-full">
      <Filters onChange={(e) => setFilters(e)} />
      <div className="w-full">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between w-full">
          <h1 className="text-xl lg:text-[28px] font-bold lg:pb-4">
            Todos os nossos produtos
          </h1>
          <p className="text-sm lg:text-lg text-neutral_11">
            +{allProducts.length} produtos
          </p>
        </div>
        <div className="grid grid-cols-2 2xl:grid-cols-3 gap-3 lg:gap-5 w-full mt-6 lg:mt-0">
          {allProducts.length > 0 ? (
            <>
              <ProductList products={getCurrentPageProducts()} />
            </>
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
        <Pagination
          currentPage={Number(page)}
          totalItems={allProducts.length}
          itemsPerPage={itemsPerPage}
          onPageChange={handlePageChange}
        />
      </div>
    </section>
  );
}
