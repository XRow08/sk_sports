"use client";
import { IOrderItem } from "@/interfaces";
import { PropsWithChildren, useEffect, useState } from "react";
import { useOrderStore } from "@/store";
import { StorageHelper } from "@/helpers";

export const CartProvider = ({ children }: PropsWithChildren) => {
  const [loading, setLoading] = useState(true);
  /* const { findAllByCustomerId } = OrderService;
  const { findAllByOrderId } = OrderItemService; */
  const { setItems, setOrder } = useOrderStore();

  const fetchPendingOrder = async () => {
    /* const customer = StorageHelper.getItem("customer");
    if (!customer) return;
    const shop = await ShopService.findOneBySlug(shop_slug);
    const orders = await findAllByCustomerId(customer.id);
    const pendingOrder = orders.find((e) => e.status === "pending");
    if (!pendingOrder) return;
    const fetchedItems = await findAllByOrderId(pendingOrder.id);
    const shopItems = fetchedItems.filter((e) => e.product.shop_id === shop.id);
    const localCart = await getLocalStorageCart();
    const localCartMap = new Map(
      localCart.map((item) => [item.product_id, item])
    );
    const mergedItems = [...localCart];

    for (const fetchedItem of shopItems) {
      if (!localCartMap.has(fetchedItem.product_id)) {
        mergedItems.push(fetchedItem);
      }
    }
    updateLocalStorageCart(mergedItems);
    setOrder(pendingOrder); */
  };

  const updateLocalStorageCart = (updatedCart: IOrderItem[]) => {
    StorageHelper.setItem(`order_items`, updatedCart);
    setItems(updatedCart);
  };

  const getLocalStorageCart = async () => {
    const cart: IOrderItem[] = StorageHelper.getItem(`order_items`);
    return cart || [];
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
  }, [setItems]);

  if (loading) return <></>;

  return children;
};
