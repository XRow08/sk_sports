import { IProduct } from "./IProduct";

export interface IOrder {
  id: string;
  user_id: string;
  status: string;
  discount: number;
  addition: number;
  portage: number;
  total_price: number;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
  origin: string | null;
}

export interface ICreateOrder {
  user_id: string;
  status: string;
  discount: number;
  addition: number;
  portage: number;
  total_price?: number;
}

export interface IUpdateOrder extends Partial<ICreateOrder> {}

export interface IOrderItem {
  id: string;
  order_id: string;
  product_id: string;
  quantity: number;
  each_price: number;
  total_price: number;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
  product: IProduct;
}

export interface ICreateOrderItem {
  order_id: string;
  product_id: string;
  quantity: number;
  each_price?: number;
  total_price?: number;
}

export interface IUpdateOrderItem extends Partial<ICreateOrderItem> {
  total_price?: number;
}
