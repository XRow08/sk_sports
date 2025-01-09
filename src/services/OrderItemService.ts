import Api from "@/helpers/Api";
import { ICreateOrderItem, IOrderItem, IUpdateOrderItem } from "@/interfaces";

export const OrderItemService = {
  async createOne(payload: ICreateOrderItem) {
    const { data } = await Api.post<IOrderItem>("/orders-items", payload);
    return data;
  },

  async findOneById(id: string) {
    const { data } = await Api.get<IOrderItem>(`/orders-items/${id}`);
    return data || undefined;
  },

  async findAll() {
    const { data } = await Api.get<IOrderItem[]>("/orders-items");
    return data;
  },

  async findAllByOrderId(id: string) {
    const { data } = await Api.get<IOrderItem[]>(`/orders-items/order/${id}`);
    return data;
  },

  async updateById(id: string, payload: IUpdateOrderItem) {
    const { data } = await Api.patch<IOrderItem>(
      `/orders-items/${id}`,
      payload
    );
    return data;
  },

  async deleteById(id: string) {
    const { data } = await Api.delete(`/orders-items/${id}`);
    return data;
  },
};
