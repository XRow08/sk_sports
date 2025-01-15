import Api from "@/helpers/Api";
import type { ICreatePurchase } from "@/interfaces";

export const AppMaxService = {
  async createOrder(payload: ICreatePurchase) {
    const { data } = await Api.post(`/appmax/payment`, payload);
    return data;
  },
};
