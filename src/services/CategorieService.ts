import Api from "@/helpers/Api";
import { ICreateCategory, ICategory, IUpdateCategory } from "@/interfaces";

export const CategoryService = {
  async createOne(payload: ICreateCategory) {
    const { data } = await Api.post<ICategory>("/categories", payload);
    return data;
  },

  async findOneById(id: string) {
    const { data } = await Api.get<ICategory>(`/categories/${id}`);
    return data;
  },

  async findAll() {
    const { data } = await Api.get<ICategory[]>("/categories");
    return data;
  },

  async findAllByShopId(id: string) {
    const { data } = await Api.get<ICategory[]>(`/categories/shop/${id}`);
    return data;
  },

  async updateById(id: string, payload: IUpdateCategory) {
    const { data } = await Api.patch<ICategory>(`/categories/${id}`, payload);
    return data;
  },

  async deleteById(id: string) {
    const { data } = await Api.delete(`/categories/${id}`);
    return data;
  },
};
