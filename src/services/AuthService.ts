import Api from "@/helpers/Api";
import { ILogin, ILoginResponse } from "@/interfaces";

export const AuthService = {
  async login(payload: ILogin) {
    const { data } = await Api.post(`/auth/login`, payload);
    return data as ILoginResponse;
  },

  async sendPasswordResetEmail(email: string) {
    const { data } = await Api.post(`/auth/password-reset`, { email });
    return data;
  },
};
