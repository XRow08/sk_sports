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

  async findAllByUserId(id: string) {
    const { data } = await Api.get<IOrder[]>(`/orders/user/${id}`);
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
