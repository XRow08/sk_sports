import Api from "@/helpers/Api";
import {
  ICreateNotification,
  INotification,
  IUpdateNotification,
} from "@/interfaces";

export const NotificationService = {
  async createOne(payload: ICreateNotification) {
    const { data } = await Api.post<INotification>("/notifications", payload);
    return data;
  },

  async findOneById(id: string) {
    const { data } = await Api.get<INotification>(`/notifications/${id}`);
    return data;
  },

  async findAll() {
    const { data } = await Api.get<INotification[]>("/notifications");
    return data;
  },

  async findAllByUserId(id: string) {
    const { data } = await Api.get(`/notifications/user/${id}`);
    return data as INotification[];
  },

  async findAllByCustomerId(id: string) {
    const { data } = await Api.get(`/notifications/customer/${id}`);
    return data as INotification[];
  },

  async updateById(id: string, payload: IUpdateNotification) {
    const { data } = await Api.patch(`/notifications/${id}`, payload);
    return data as INotification;
  },

  async deleteById(id: string) {
    await Api.delete(`/notifications/${id}`);
  },
};
