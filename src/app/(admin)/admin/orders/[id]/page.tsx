"use client";
import { useAuth } from "@/components/Providers";
import { StatusPayment } from "@/components/StatusPayment";
import { IOrder, IOrderItem } from "@/interfaces";
import { OrderItemService, OrderService } from "@/services";
import { notFound } from "next/navigation";
import { useState, useEffect } from "react";

type Props = { params: { id: string } };

export default function PurchaseDetails({ params }: Props) {
  const [order, setOrder] = useState<IOrder | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [orderItems, setOrderItems] = useState<IOrderItem[]>([]);
  const { user } = useAuth();

  const fetchOrder = async () => {
    try {
      const order = await OrderService.findOneById(params.id);
      setOrder(order);
      setIsLoading(false);
    } catch (error) {
      console.error(error);
      setIsLoading(false);
    }
  };

  async function fetchOrderItems() {
    const items = await OrderItemService.findAllByOrderId(params.id);
    setOrderItems(items);
  }


  useEffect(() => {
    fetchOrderItems();
    fetchOrder();
  }, []);

  if (isLoading && !order) return <div>Carregando...</div>;
  if (!order) return notFound();

  const createdAt = order?.createdAt
    ? new Date(order?.createdAt).toLocaleDateString()
    : "";
  const updatedAt = order?.updatedAt
    ? new Date(order?.updatedAt).toLocaleDateString()
    : "";

  return (
    <div className="min-h-screen w-full pb-20">
      <div className="max-w-7xl w-full mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-xl font-medium flex items-center gap-2">
              Pedido #{order?.id}
            </h1>
            <p className="text-gray-600 text-sm">Alterado em {updatedAt}</p>
          </div>
        </div>

        <div className="space-y-6">
          <StatusPayment
            status={order?.status || ""}
            date={createdAt}
            updateDate={updatedAt}
          />

          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-lg font-bold mb-4">Detalhes do produtos</h2>
            <div className="flex flex-col gap-4">
              {orderItems.map((item) => (
                <div className="flex gap-4">
                  <img
                    src={item.product.image_url}
                    alt={item.product.name}
                    className="w-20 h-20 object-cover rounded"
                  />

                  <div>
                    <h3 className="font-medium">{item.product.name}</h3>
                    <p className="text-sm text-gray-600">
                      Tamanho: {item.size}
                    </p>
                    <p className="font-bold mt-2">
                      R$ {item.each_price.toFixed(2)}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-lg font-bold mb-4">Dados do usuario</h2>
            <div className="space-y-2">
              <p>{user?.first_name} {user?.last_name}</p>
              <p>{user?.email}</p>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-lg font-bold mb-4">Endereço de entrega</h2>
            <div className="space-y-2">
              <p>{user?.address?.address}</p>
              <p>{user?.address?.district}</p>
              <p>
                {user?.address?.city} - {user?.address?.state}
              </p>
              <p>{user?.address?.cep}</p>
              <p>{user?.address?.complement}</p>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-lg font-bold mb-4">Resumo do pedido</h2>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>R$ {order?.total_price.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Frete</span>
                <span>
                  {order?.portage === 0
                    ? "Grátis"
                    : `R$ ${order?.portage.toFixed(2)}`}
                </span>
              </div>
              <div className="flex justify-between font-bold pt-2 border-t">
                <span>Total</span>
                <span>R$ {order?.total_price.toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
