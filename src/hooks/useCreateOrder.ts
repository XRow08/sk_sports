import { OrderService, OrderItemService } from "@/services";
import { useAuthStore, useOrderStore } from "@/store";
import { useEffect } from "react";
import useCartItens from "./useCartItens";
import { orderStatus } from "@/constants";

export function useCreateOrder() {
  const { createOne } = OrderService;
  const { user } = useAuthStore();
  const { setOrder } = useOrderStore();
  const { items, updateLocalStorageCart } = useCartItens();

  useEffect(() => {
    async function createOrder() {
      const { waiting_payment } = orderStatus;
      if (!user) return;
      const orders = await OrderService.findAllByUserId(user.id);
      const hasOrder = orders.find((e) => e.status === waiting_payment);
      console.log(hasOrder);
      if (!hasOrder) {
        const newOrder = await createOne({
          user_id: user.id,
          addition: 0,
          discount: 0,
          portage: 0,
          status: waiting_payment,
        });
        const newItens = await Promise.all(
          items.map((item) =>
            OrderItemService.createOne({
              order_id: newOrder.id,
              product_id: item.product_id,
              quantity: item.quantity,
            })
          )
        );
        updateLocalStorageCart(newItens);
        setOrder(newOrder);
      } else {
        let listItems = [];
        for (const item of items) {
          try {
            let hasOrderItem = undefined;
            try {
              hasOrderItem = await OrderItemService.findOneById(item.id);
            } catch (error) {
              console.error(error);
            }
            if (hasOrderItem) return listItems.push(hasOrderItem);
            const newOrderItem = await OrderItemService.createOne({
              order_id: hasOrder.id,
              product_id: item.product_id,
              quantity: item.quantity,
            });
            const itemNew = await OrderItemService.findOneById(newOrderItem.id);
            listItems.push(itemNew);
          } catch (error) {
            console.error(error);
            return;
          }
        }
        listItems.filter((item) => item !== null);
        setOrder(hasOrder);
        updateLocalStorageCart(listItems);
      }
    }
    createOrder();
  }, [setOrder]);
}
