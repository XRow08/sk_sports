import Api from "@/helpers/Api";
import {
  ICreateUser,
  IUser,
  IUserGroup,
  IUpdateUser,
  IResetPass,
} from "@/interfaces";

export const UserService = {
  async createOne(payload: ICreateUser) {
    const { data } = await Api.post<IUser>("/users", payload);
    return data;
  },

  async findOneById(id: string) {
    const { data } = await Api.get<IUser>(`/users/${id}`);
    return data;
  },

  async findAll() {
    const { data } = await Api.get<IUser[]>("/users");
    return data;
  },

  async findAllUserGroup() {
    const { data } = await Api.get<IUserGroup[]>("/user-group");
    return data;
  },

  async findCep(cep: string) {
    const { data } = await Api.get(`/cep/${cep}`);
    return data;
  },

  async validateCode(payload: { email: string; code: string }) {
    const { email, code } = payload;
    const { data } = await Api.patch(`/users/reset/validate/${email}`, { code });
    return data;
  },

  async resetPassword(payload: IResetPass) {
    const { email, ...rest } = payload;
    const { data } = await Api.patch(`/users/reset/password/${email}`, rest);
    return data;
  },

  async updateById(id: string, payload: IUpdateUser) {
    const { data } = await Api.patch(`/users/${id}`, payload);
    return data as IUser;
  },

  async deleteById(id: string) {
    await Api.delete(`/users/${id}`);
  },
};
