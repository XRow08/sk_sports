import { IOrder } from "@/interfaces";
import OrderItemAdmin from "./OrderItem";

export function OrderList({ orders }: { orders: IOrder[] }) {
  return (
    <div className="grid grid-cols-1 w-full">
      {orders.map((item) => <OrderItemAdmin key={item.id} item={item} />)}
    </div>
  );
}