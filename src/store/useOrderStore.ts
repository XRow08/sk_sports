import { IOrder, IOrderItem, IProduct } from "@/interfaces";
import { create } from "zustand";

export interface useOrderStore {
  order: IOrder | undefined;
  setOrder: (order: IOrder) => void;
  items: IOrderItem[];
  setItems: (items: IOrderItem[]) => void;
  showCart: boolean;
  setShowCart: (showCart: boolean) => void;
  showReview: boolean;
  setShowReview: (showReview: boolean) => void;
  showSearch: boolean;
  setShowSearch: (showSearch: boolean) => void;
  productToReview: IProduct | undefined;
  setProductToReview: (productToReview: IProduct | undefined) => void;
  paymentMethod: string;
  setPaymentMethod: (paymentMethod: string) => void;
  showInstallments: boolean;
  setShowInstallments: (showInstallments: boolean) => void;
}

export const useOrderStore = create<useOrderStore>((set) => ({
  order: undefined,
  setOrder: (order) => set({ order }),
  items: [],
  setItems: (items) => set({ items }),
  showCart: false,
  setShowCart: (showCart) => set({ showCart }),
  showReview: false,
  setShowReview: (showReview) => set({ showReview }),
  showSearch: false,
  setShowSearch: (showSearch) => set({ showSearch }),
  productToReview: undefined,
  setProductToReview: (productToReview) => set({ productToReview }),
  paymentMethod: "",
  setPaymentMethod: (paymentMethod) => set({ paymentMethod }),
  showInstallments: false,
  setShowInstallments: (showInstallments) => set({ showInstallments }),
}));
