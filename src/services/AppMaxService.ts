import Api from "@/helpers/Api";
import type { ICreateCard, ICreatePurchase } from "@/interfaces";
import axios from "axios";

export const AppMaxService = {
  async createOrder(payload: ICreatePurchase) {
    const { data } = await Api.post(`/appmax/payment`, payload);
    return data;
  },

  async createCard(payload: ICreateCard) {
    const { data } = await axios.post("/api/appmax/credit-card", payload);
    return data;
  },
};
