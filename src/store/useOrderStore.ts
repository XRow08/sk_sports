import { IOrder, IOrderItem } from "@/interfaces";
import { create } from "zustand";

export interface useOrderStore {
  order: IOrder | undefined;
  setOrder: (order: IOrder) => void;
  items: IOrderItem[];
  setItems: (items: IOrderItem[]) => void;
  showCart: boolean;
  setShowCart: (showCart: boolean) => void;
  showSearch: boolean;
  setShowSearch: (showSearch: boolean) => void;
}

export const useOrderStore = create<useOrderStore>((set) => ({
  order: undefined,
  setOrder: (order) => set({ order }),
  items: [],
  setItems: (items) => set({ items }),
  showCart: false,
  setShowCart: (showCart) => set({ showCart }),
  showSearch: false,
  setShowSearch: (showSearch) => set({ showSearch }),
}));
