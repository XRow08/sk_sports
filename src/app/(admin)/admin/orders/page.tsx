"use client";
import { OrderList } from "@/components/Admin/Orders/OrderList";
import { Button } from "@/components/Button";
import { NotFoundIcon } from "@/components/Icons";
import { IOrder } from "@/interfaces";
import { OrderService } from "@/services";
import Link from "next/link";
import { useState, useEffect } from "react";

export default function OrdersPageAdmin() {
  const [search, setSearch] = useState("");
  const [orderList, setOrderList] = useState<IOrder[]>([]);

  useEffect(() => {
    const getOrders = async () => {
      const orders = await OrderService.findAll();
      setOrderList(orders);
    };

    getOrders();
  }, [search]);

  return (
    <section className="flex flex-col w-[1260px] pb-20">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between w-full mt-2 mb-10">
        <h1 className="text-xl lg:text-[28px] font-bold">Lista de Pedidos</h1>
      </div>

     {/*  <div className="flex items-center mb-8 mt-4">
        <input
          onChange={({ target }) => setSearch(target.value)}
          value={search}
          className="border-b border-neutral_6 bg-transparent p-3 font-semibold text-neutral_11 outline-none w-full"
          type="text"
          placeholder="Pesquise aqui"
        />
      </div> */}

      <div className="rounded w-full border border-neutral_6">
        <div className="flex items-center justify-between bg-neutral_3 p-4 w-full border-b border-neutral_6">
          <h1 className="min-w-[160px] w-[160px] text-start">Nome</h1>
          <h1 className="min-w-[290px] w-[290px] text-center">Email</h1>
          <h1 className="min-w-[156px] w-[156px] text-center">Data</h1>
          <h1 className="min-w-[156px] w-[156px] text-center">Total</h1>
          <h1 className="w-full text-center">Status</h1>
          <h1 className="min-w-[112px] w-[112px] text-end">Ações</h1>
        </div>
        {orderList.length > 0 ? (
          <OrderList orders={orderList} />  
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
