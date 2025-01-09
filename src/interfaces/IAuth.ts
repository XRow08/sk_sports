import { IUser } from "./IUser";

export interface ILogin {
  email: string;
  password: string;
}

export interface ILoginResponse {
  token: string,
  expiresIn: string,
  user: IUser
}


