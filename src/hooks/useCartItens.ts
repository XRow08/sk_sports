"use client";
import { StorageHelper } from "@/helpers";
import { IOrderItem, IProduct } from "@/interfaces";
import { OrderItemService } from "@/services";
import { useOrderStore } from "@/store";

export default function useCartItens() {
  const { setItems, items, order } = useOrderStore();

  const updateLocalStorageCart = (updatedCart: IOrderItem[]) => {
    StorageHelper.setItem(`order_items`, updatedCart);
    setItems(updatedCart);
  };

  const getLocalStorageCart = async () => {
    const cart: IOrderItem[] = StorageHelper.getItem(`order_items`);
    return cart || [];
  };

  const addToCart = async (product: IProduct, amount: number) => {
    try {
      const localCart = await getLocalStorageCart();
      const existingItem = localCart.find((e) => e.product_id === product.id);
      if (existingItem) {
        await onChangeAmount(amount, existingItem);
      } else {
        const total_price = amount * product.price;
        localCart.push({
          id: (localCart.length + 1).toString(),
          quantity: amount,
          product_id: product?.id,
          product: product,
          order_id: order?.id || "1",
          total_price,
          each_price: product?.price,
          createdAt: new Date(),
          updatedAt: new Date(),
          deletedAt: null,
        });
        updateLocalStorageCart(localCart);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const removeFromCart = async (orderItemId: string) => {
    try {
      const item = items.find((e) => e.id === orderItemId);
      if (!item) return;
      const updatedCart = items.filter((e) => e.id !== orderItemId);
      updateLocalStorageCart(updatedCart);
      if (!!item.order_id) await OrderItemService.deleteById(orderItemId);
    } catch (error) {
      console.error(error);
    }
  };

  const onChangeAmount = async (amount: number, item: IOrderItem) => {
    try {
      if (amount === 0) return await removeFromCart(item.id);
      const localCart = await getLocalStorageCart();
      const updatedCart = localCart.map((e) =>
        e.id === item.id ? { ...e, quantity: amount } : e
      );
      updateLocalStorageCart(updatedCart);
    } catch (error) {
      console.error(error);
    }
  };
  
  const totalPrice = items.reduce(
    (acc, i) => acc + i.product.price * i.quantity,
    0
  );

  return {
    addToCart,
    items,
    order,
    removeFromCart,
    onChangeAmount,
    totalPrice,
    updateLocalStorageCart,
  };
}
