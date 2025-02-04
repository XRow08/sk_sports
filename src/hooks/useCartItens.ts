"use client";
import { StorageHelper } from "@/helpers";
import { IOrderItem, IProduct } from "@/interfaces";
import { OrderItemService } from "@/services";
import { useOrderStore } from "@/store";
import toast from "react-hot-toast";

interface CartItem extends IOrderItem {
  product: IProduct;
  size?: string;
  perso_number?: number;
  perso_text?: string;
}

interface AddToCartParams {
  product: IProduct;
  amount: number;
  size?: string;
  perso_number?: number;
  perso_text?: string;
}

const STORAGE_KEY = "order_items";

export default function useCartItems() {
  const { setItems, items, order } = useOrderStore();
  const showSuccessToast = (message: string) => toast.success(message);
  const showErrorToast = (message: string) => toast.error(message);

  const updateLocalStorageCart = (updatedCart: CartItem[]) => {
    try {
      StorageHelper.setItem(STORAGE_KEY, updatedCart);
      setItems(updatedCart as IOrderItem[]);
    } catch (error) {
      console.error("Error updating cart:", error);
      showErrorToast("Erro ao atualizar carrinho");
    }
  };

  const getLocalStorageCart = (): CartItem[] => {
    try {
      return StorageHelper.getItem(STORAGE_KEY) || [];
    } catch (error) {
      console.error("Error getting cart:", error);
      showErrorToast("Erro ao carregar carrinho");
      return [];
    }
  };

  const calculateItemPrice = (quantity: number, price: number): number => {
    return quantity * price;
  };

  const createNewCartItem = ({
    product,
    amount,
    size,
    perso_number,
    perso_text,
  }: AddToCartParams): CartItem => {
    const localCart = getLocalStorageCart();
    return {
      id: `${Date.now()}-${localCart.length + 1}`,
      quantity: amount,
      product_id: product.id,
      product: product,
      order_id: order?.id || "1",
      total_price: calculateItemPrice(amount, product.price),
      each_price: product.price,
      createdAt: new Date(),
      updatedAt: new Date(),
      deletedAt: null,
      ...(size && { size }),
      ...(perso_number && { perso_number }),
      ...(perso_text && { perso_text }),
    };
  };

  const addToCart = async ({
    product,
    amount,
    size,
    perso_number,
    perso_text,
  }: AddToCartParams) => {
    try {
      const localCart = getLocalStorageCart();
      const existingItem = localCart.find(
        (item) => item.product_id === product.id
      );

      if (existingItem) {
        await onChangeAmount(amount, existingItem);
        return;
      }

      const newItem = createNewCartItem({
        product,
        amount,
        size,
        perso_number,
        perso_text,
      });

      updateLocalStorageCart([...localCart, newItem]);
      showSuccessToast("Produto adicionado ao carrinho");
    } catch (error) {
      console.error("Error adding to cart:", error);
      showErrorToast("Erro ao adicionar produto ao carrinho");
    }
  };

  const removeFromCart = async (orderItemId: string) => {
    try {
      const item = items.find((item) => item.id === orderItemId);
      if (!item) return;

      const updatedCart = items.filter((item) => item.id !== orderItemId);
      updateLocalStorageCart(updatedCart);

      const isLocalId =
        item.id.includes("-") && !isNaN(Number(item.id.split("-")[0]));
      if (!isLocalId) {
        await OrderItemService.deleteById(orderItemId);
      }

      showSuccessToast("Produto removido do carrinho");
    } catch (error) {
      console.error("Error removing from cart:", error);
      showErrorToast("Erro ao remover produto do carrinho");
    }
  };

  const onChangeAmount = async (amount: number, item: CartItem) => {
    try {
      if (amount <= 0) {
        await removeFromCart(item.id);
        return;
      }

      const localCart = getLocalStorageCart();
      const updatedCart = localCart.map((cartItem) =>
        cartItem.id === item.id
          ? {
              ...cartItem,
              quantity: amount,
              total_price: calculateItemPrice(amount, cartItem.product.price),
              updatedAt: new Date(),
            }
          : cartItem
      );

      updateLocalStorageCart(updatedCart);
      showSuccessToast("Quantidade do produto alterada");
    } catch (error) {
      console.error("Error changing amount:", error);
      showErrorToast("Erro ao alterar quantidade do produto");
    }
  };

  const totalPrice = items.reduce(
    (acc, item) => acc + calculateItemPrice(item.quantity, item.product.price),
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
