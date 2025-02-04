import { useState, useEffect } from "react";
import { useAuthStore, useOrderStore } from "@/store";
import { OrderService, OrderItemService } from "@/services";
import {
  IOrder,
  IOrderItem,
  IProduct,
  ICreateOrder,
  ICreateOrderItem,
} from "@/interfaces";
import toast from "react-hot-toast";
import useCartItems from "./useCartItens";

export function useCreateOrder() {
  const { user } = useAuthStore();
  const { setOrder } = useOrderStore();
  const { items, updateLocalStorageCart } = useCartItems();
  const [isProcessing, setIsProcessing] = useState(false);
  const [hasProcessed, setHasProcessed] = useState(false);

  const createOrderItem = async (
    orderId: string,
    item: IOrderItem
  ): Promise<IOrderItem> => {
    try {
      const existingItems = await OrderItemService.findAllByOrderId(orderId);
      const existingItem = existingItems.find(
        (existing) =>
          existing.product_id === item.product_id && existing.size === item.size
      );
      if (existingItem) {
        return { ...existingItem, product: item.product };
      }
      const createItemData: ICreateOrderItem = {
        order_id: orderId,
        product_id: item.product_id,
        quantity: item.quantity,
        size: item.size || "",
        perso_number: item.perso_number,
        perso_text: item.perso_text,
        each_price: item.product.price,
        total_price: item.quantity * item.product.price,
      };

      const orderItem = await OrderItemService.createOne(createItemData);
      return { ...orderItem, product: item.product };
    } catch (error) {
      console.error("Error creating order item:", {
        error,
        orderId,
        item,
      });
      throw error;
    }
  };

  const processExistingOrder = async (order: IOrder): Promise<IOrderItem[]> => {
    try {
      const existingItems = await OrderItemService.findAllByOrderId(order.id);
      const processedItems: IOrderItem[] = [];

      for (const cartItem of items) {
        const isLocalId =
          cartItem.id.includes("-") &&
          !isNaN(Number(cartItem.id.split("-")[0]));

        if (!isLocalId) {
          const existingItem = existingItems.find(
            (item) => item.id === cartItem.id
          );
          if (existingItem) {
            const updatedItem = await OrderItemService.updateById(existingItem.id, {
              quantity: cartItem.quantity,
              total_price: cartItem.quantity * cartItem.product.price,
            });
            processedItems.push({ ...updatedItem, product: cartItem.product });
          }
          continue;
        }

        const newItem = await createOrderItem(order.id, cartItem);
        processedItems.push(newItem);
      }

      for (const existingItem of existingItems) {
        const stillExists = items.some((item) => item.id === existingItem.id);
        if (!stillExists) {
          await OrderItemService.deleteById(existingItem.id);
        }
      }

      return processedItems;
    } catch (error) {
      console.error("Error processing existing order:", error);
      throw error;
    }
  };

  const processNewOrder = async (): Promise<{
    order: IOrder;
    items: IOrderItem[];
  }> => {
    try {
      const createOrderData: ICreateOrder = {
        user_id: user!.id,
        status: "waiting_payment",
        discount: 0,
        addition: 0,
        portage: 0,
        total_price: items.reduce(
          (acc, item) => acc + item.quantity * item.product.price,
          0
        ),
      };

      const newOrder = await OrderService.createOne(createOrderData);

      const orderItems = await Promise.all(
        items.map((item) => createOrderItem(newOrder.id, item))
      );

      return { order: newOrder, items: orderItems };
    } catch (error) {
      console.error("Error processing new order:", error);
      throw error;
    }
  };

  const processOrder = async () => {
    if (!user || isProcessing || items.length === 0 || hasProcessed) {
      console.log("Process order conditions not met:", {
        hasUser: !!user,
        isProcessing,
        itemsCount: items.length,
        hasProcessed,
      });
      return;
    }

    setIsProcessing(true);
    try {
      const orders = await OrderService.findAllByUserId(user.id);
      const pendingOrder = orders
        .filter((order) => order.status === "waiting_payment")
        .sort(
          (a, b) =>
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        )[0];

      let finalOrder: IOrder;
      let orderItems: IOrderItem[];

      const totalPrice = items.reduce(
        (acc, item) => acc + item.quantity * item.product.price,
        0
      );

      if (pendingOrder) {
        orderItems = await processExistingOrder(pendingOrder);
        finalOrder = await OrderService.updateById(pendingOrder.id, {
          total_price: totalPrice,
        });
      } else {
        const result = await processNewOrder();
        finalOrder = result.order;
        orderItems = result.items;
      }

      updateLocalStorageCart(orderItems);
      setOrder(finalOrder);
      setHasProcessed(true);
    } catch (error: any) {
      console.error("Error processing order:", {
        error,
        userId: user?.id,
        itemsCount: items.length,
      });
      toast.error(error.message || "Erro ao processar pedido");
    } finally {
      setIsProcessing(false);
    }
  };

  useEffect(() => {
    if (items.length > 0 && user && !hasProcessed) {
      processOrder();
    }
  }, [items.length, user]);

  return { isProcessing };
}
