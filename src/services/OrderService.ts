import Api from "@/helpers/Api";
import { ICreateOrder, IOrder, IUpdateOrder } from "@/interfaces";

export const OrderService = {
  async createOne(payload: ICreateOrder) {
    const { data } = await Api.post<IOrder>("/orders", payload);
    return data;
  },

  async findOneById(id: string) {
    const { data } = await Api.get<IOrder>(`/orders/${id}`);
    return data;
  },

  async findAll() {
    const { data } = await Api.get<IOrder[]>("/orders");
    return data;
  },

  async findAllByCustomerId(id: string) {
    const { data } = await Api.get<IOrder[]>(`/orders/customer/${id}`);
    return data;
  },

  async findAllBySellerId(id: string) {
    const { data } = await Api.get<IOrder[]>(`/orders/seller/${id}`);
    return data;
  },

  async findAllByShopId(id: string) {
    const { data } = await Api.get<IOrder[]>(`/orders/shop/${id}`);
    return data;
  },

  async calculatePortage(id: string, cep: string) {
    const { data } = await Api.get(`/orders/${id}/calculate/portage/${cep}`);
    return data;
  },

  async updateById(id: string, payload: IUpdateOrder) {
    const { data } = await Api.patch<IOrder>(`/orders/${id}`, payload);
    return data;
  },

  async deleteById(id: string) {
    const { data } = await Api.delete(`/orders/${id}`);
    return data;
  },
};
