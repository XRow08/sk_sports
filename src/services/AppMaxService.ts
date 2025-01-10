import Api from "@/helpers/Api";
import { ICreateCardToken, ICreateCard } from "@/interfaces";
import axios from "axios";

export const AppMaxService = {
  async createCardToken(card: ICreateCardToken) {
    const url = "https://homolog.sandboxappmax.com.br/Api/v3/tokenize/card";
    const { data } = await axios.post(url, { card });
    return data;
  },

  async createOrderPix(orderId: string, payload: { document: string }) {
    const { data } = await Api.post(`/appmax/payment/${orderId}`, payload);
    return data;
  },

  async createOrderCredit(orderId: string, payload: ICreateCard) {
    const { data } = await Api.post(`/appmax/payment/${orderId}`, payload);
    return data;
  },
};
