import Api from "@/helpers/Api";
import { ICreateAddress, IAddress, IUpdateAddress } from "@/interfaces";

export const AddressService = {
  async createOne(payload: ICreateAddress) {
    const { data } = await Api.post<IAddress>("/address", payload);
    return data;
  },

  async findOneById(id: string) {
    const { data } = await Api.get<IAddress>(`/address/${id}`);
    return data;
  },

  async findAll() {
    const { data } = await Api.get<IAddress[]>("/address");
    return data;
  },

  async updateById(id: string, payload: IUpdateAddress) {
    const { data } = await Api.patch<IAddress>(`/address/${id}`, payload);
    return data;
  },

  async deleteById(id: string) {
    const { data } = await Api.delete(`/address/${id}`);
    return data;
  },
};
