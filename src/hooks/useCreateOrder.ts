import { OrderService, OrderItemService, ProductService } from "@/services";
import { useAuthStore, useOrderStore } from "@/store";
import { useEffect, useState } from "react";
import useCartItens from "./useCartItens";
import { orderStatus } from "@/constants";

export function useCreateOrder() {
  const { createOne } = OrderService;
  const { user } = useAuthStore();
  const { setOrder } = useOrderStore();
  const { items, updateLocalStorageCart } = useCartItens();
  const [isLoading, setIsLoading] = useState(false);
  const [hasInitialized, setHasInitialized] = useState(false);

  useEffect(() => {
    let isSubscribed = true;

    async function createOrder() {
      if (!isSubscribed || isLoading || hasInitialized || !user) return;
      setIsLoading(true);
      setHasInitialized(true);

      try {
        const { waiting_payment } = orderStatus;
        const orders = await OrderService.findAllByUserId(user.id);
        const hasOrder = orders
          .filter((e) => e.status === waiting_payment)
          .sort(
            (a, b) =>
              new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
          )[0];

        if (!hasOrder) {
          const newOrder = await createOne({
            user_id: user.id,
            addition: 0,
            discount: 0,
            portage: 0,
            status: waiting_payment,
          });
          const newItens = await Promise.all(
            items.map(async (item) => {
              const orderItem = await OrderItemService.createOne({
                order_id: newOrder.id,
                product_id: item.product_id,
                quantity: item.quantity,
                size: item.size,
                perso_number: item.perso_number,
                perso_text: item.perso_text,
              });
              const productData = await ProductService.findOneById(
                item.product_id
              );
              return { ...orderItem, product: productData };
            })
          );

          const orderTotal = newItens.reduce(
            (sum, item) => sum + (item.total_price || 0),
            0
          );
          const updatedOrder = await OrderService.updateById(newOrder.id, {});

          updateLocalStorageCart(newItens);
          setOrder(updatedOrder);
        } else {
          let listItems = [];
          const existingOrderItems = await OrderItemService.findAllByOrderId(
            hasOrder.id
          );

          for (const item of items) {
            try {
              const existingOrderItem = existingOrderItems.find(
                (orderItem) =>
                  orderItem.product_id === item.product_id &&
                  orderItem.size.toLowerCase() === item.size.toLowerCase()
              );

              if (existingOrderItem) {
                const newQuantity = existingOrderItem.quantity + item.quantity;
                const updatedOrderItem = await OrderItemService.updateById(
                  existingOrderItem.id,
                  { quantity: newQuantity }
                );

                const productData = await ProductService.findOneById(
                  existingOrderItem.product_id
                );
                listItems.push({ ...updatedOrderItem, product: productData });
                continue;
              }

              const newOrderItem = await OrderItemService.createOne({
                order_id: hasOrder.id,
                product_id: item.product_id,
                quantity: item.quantity,
                size: item.size,
                perso_number: item.perso_number,
                perso_text: item.perso_text,
              });
              const productData = await ProductService.findOneById(
                newOrderItem.product_id
              );
              listItems.push({ ...newOrderItem, product: productData });
            } catch (error) {
              console.error(error);
            }
          }

          const updatedOrder = await OrderService.updateById(hasOrder.id, {});
          setOrder(updatedOrder);
          updateLocalStorageCart(listItems);
        }
      } finally {
        if (isSubscribed) {
          setIsLoading(false);
        }
      }
    }

    createOrder();

    return () => {
      isSubscribed = false;
    };
  }, [hasInitialized]);
}
