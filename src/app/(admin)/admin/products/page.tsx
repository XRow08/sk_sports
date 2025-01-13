"use client";
import { ProductList } from "@/components/Admin";
import { Button } from "@/components/Button";
import { NotFoundIcon } from "@/components/Icons";
import { IProduct } from "@/interfaces";
import { ProductService } from "@/services";
import Link from "next/link";
import { useState, useEffect } from "react";

export default function ProductsPageAdmin() {
  const [search, setSearch] = useState("");
  const [productList, setProductList] = useState<IProduct[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const products = search
        ? await ProductService.findAllBySearch(search)
        : await ProductService.findAll();
      setProductList(products);
    };

    fetchProducts();
  }, [search]);

  return (
    <section className="flex flex-col w-[1260px]">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between w-full">
        <h1 className="text-xl lg:text-[28px] font-bold">Lista de produtos</h1>
        <Link href={"/admin/create"}>
          <Button bgColor="white-transparent">Adicionar item</Button>
        </Link>
      </div>

      <div className="flex items-center mb-8 mt-4">
        <input
          onChange={({ target }) => setSearch(target.value)}
          value={search}
          className="border-b border-neutral_6 bg-transparent p-3 font-semibold text-neutral_11 outline-none w-full"
          type="text"
          placeholder="Pesquise aqui"
        />
      </div>

      <div className="rounded w-full border border-neutral_6">
        <div className="flex items-center justify-between bg-neutral_3 p-4 w-full border-b border-neutral_6">
          <h1 className="min-w-[350px] text-start">Nome</h1>
          <h1 className="min-w-[290px] text-center">Preço</h1>
          <h1 className="w-full text-center">Tamanhos</h1>
          <h1 className="min-w-[290px] text-center">Qt de vendas</h1>
          <h1 className="w-full text-end">Ações</h1>
        </div>
        {productList.length > 0 ? (
          <ProductList products={productList} />
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
    </section>
  );
}
