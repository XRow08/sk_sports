import { useOrderStore } from "@/store";
import { CloseIcon, NoCartIcon, NotFoundIcon, SearchIcon } from "../Icons";
import { Button } from "../Button";
import Link from "next/link";
import { FilterHelper } from "@/helpers/FilterHelper";
import { IProduct } from "@/interfaces";
import { ProductService } from "@/services";
import { useState, useEffect } from "react";
import { Input } from "../Input";
import { ProductsList } from "./ProductsList";

export function SearchSideNav() {
  const { showSearch, setShowSearch } = useOrderStore();
  const [search, setSearch] = useState("");
  const [productList, setProductList] = useState<IProduct[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      if (!search) return;
      const products = await ProductService.findAllBySearch(search);
      setProductList(products);
    };

    fetchProducts();
  }, [search]);

  return (
    <div
      className={`${
        !showSearch ? "translate-x-full" : ""
      } transition-all duration-300 ease-in-out fixed top-[68px] flex flex-col justify-between z-50 right-0  w-[622px] ${
        search
          ? "min-h-[calc(100vh-68px)] pb-[88px]"
          : "min-h-min rounded-bl-2xl pb-6"
      } bg-neutral_2 border-l border-b border-neutral_6`}
    >
      <div className="flex flex-col justify-between h-full overflow-y-auto mt-6">
        <div className="flex items-center w-full justify-between px-4">
          <input
            onChange={({ target }) => setSearch(target.value)}
            value={search}
            className="border-b border-neutral_6 bg-transparent p-3 font-semibold text-neutral_11 outline-none w-full"
            type="text"
            placeholder="Pesquise aqui"
          />
          <div onClick={() => setShowSearch(false)} className="cursor-pointer">
            <CloseIcon />
          </div>
        </div>

        {search &&
          (productList.length > 0 ? (
            <ProductsList items={productList} />
          ) : (
            <div className="w-full flex items-center justify-center">
              <div className="flex flex-col items-center justify-center mt-[88px]">
                <NotFoundIcon />
                <h1 className="text-2xl font-semibold mt-8">
                  Nenhum item encontrado
                </h1>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}
