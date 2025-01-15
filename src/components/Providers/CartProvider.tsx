"use client";
import { IOrderItem } from "@/interfaces";
import { PropsWithChildren, useEffect, useState } from "react";
import { useAuthStore, useOrderStore } from "@/store";
import { StorageHelper } from "@/helpers";
import { OrderService, OrderItemService } from "@/services";
import { orderStatus } from "@/constants";

export const CartProvider = ({ children }: PropsWithChildren) => {
  const [loading, setLoading] = useState(true);
  const { findAllByUserId } = OrderService;
  const { findAllByOrderId } = OrderItemService;
  const { setItems, setOrder } = useOrderStore();
  const { user } = useAuthStore();

  const fetchPendingOrder = async () => {
    if (!user) return;
    const { waiting_payment } = orderStatus;
    const orders = await findAllByUserId(user.id);
    const pendingOrder = orders.find((e) => e.status === waiting_payment);
    if (!pendingOrder) return;
    console.log(pendingOrder);
    const fetchedItems = await findAllByOrderId(pendingOrder.id);
    const localCart = await getLocalStorageCart();
    const localCartMap = new Map(localCart.map((e) => [e.product_id, e]));
    const mergedItems = [...localCart];
    for (const fetchedItem of fetchedItems) {
      if (!localCartMap.has(fetchedItem.product_id)) {
        mergedItems.push(fetchedItem);
      }
    }
    updateLocalStorageCart(mergedItems);
    setOrder(pendingOrder);
  };

  const updateLocalStorageCart = (updatedCart: IOrderItem[]) => {
    StorageHelper.setItem(`order_items`, updatedCart);
    setItems(updatedCart);
  };

  const getLocalStorageCart = () => {
    const cart: IOrderItem[] = StorageHelper.getItem(`order_items`);
    return Promise.resolve(cart || []);
  };

  useEffect(() => {
    const getOrderItems = async () => {
      try {
        setLoading(true);
        const orderItems = await getLocalStorageCart();
        setItems(orderItems);
        await fetchPendingOrder();
        setLoading(false);
      } catch (error) {
        console.error("Erro ao buscar itens do pedido:", error);
        setLoading(false);
      }
    };
    getOrderItems();
  }, [setItems, user]);

  if (loading) return <></>;

  return children;
};
