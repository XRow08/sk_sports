"use client";
import { IOrder, IOrderItem } from "@/interfaces";
import { OrderItemService } from "@/services";
import Link from "next/link";
import { useState, useEffect } from "react";
import { statusConfig } from "@/constants";
import { Button } from "../Button";

export function OrderItem({ order }: { order: IOrder }) {
  const [orderItems, setOrderItems] = useState<IOrderItem[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const items = await OrderItemService.findAllByOrderId(order.id);
      if (!items[0].product) return;
      setOrderItems(items);
    };
    fetchProducts();
  }, []);

  const currentStatus = statusConfig[order.status as keyof typeof statusConfig];
  const Icon = currentStatus.icon;

  return (
      <div className="bg-white rounded-lg shadow overflow-hidden h-full">
        <div className="flex items-center gap-2 p-4">
          <Icon className={`w-5 h-5 ${currentStatus.color}`} />
          <span className={`font-bold ${currentStatus.color}`}>
            {currentStatus.message}
          </span>
        </div>

        <div className="p-4">
          <div className="aspect-w-3 aspect-h-4 mb-4 h-full">
            <img
              src={orderItems[0]?.product.image_url}
              alt={orderItems[0]?.product.name}
              className="w-full h-full object-cover"
            />
          </div>

          <div className="space-y-2 mb-4">
            <div className="text-sm text-gray-600">
              {orderItems.length} item
            </div>
            <div className="text-sm text-gray-600">Pedido #{order.id}</div>
            <div className="font-medium">R$ {order.total_price.toFixed(2)}</div>
          </div>

          <Link href={`/orders/${order.id}`} className="w-full">
            <Button bgColor="white-transparent" className="w-full">
              Ver pedido
            </Button>
          </Link>
        </div>
      </div>
  );
}
