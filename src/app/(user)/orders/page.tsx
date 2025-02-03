"use client"
import { OrderService } from "@/services";
import { OrderItem } from "@/components/Orders/OrderItem";
import { useEffect, useState } from "react";
import { useAuth } from "@/components/Providers";
import { IOrder } from "@/interfaces";

export default function PurchasesList() {
  const {user} = useAuth()
  const [orders, setOrders] = useState<IOrder[]>([])
  
  useEffect(() => {
    const fetchOrders = async () => {
      if (!user) return;
      const orders = await OrderService.findAllByUserId(user?.id);
      setOrders(orders);
    };
    fetchOrders();
  }, [user]);

  return (
    <div className="min-h-screen">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-medium">Pedidos</h1>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {orders?.map((order) => (
            <OrderItem key={order.id} order={order} />
          ))}
        </div>
      </div>
    </div>
  );
}
