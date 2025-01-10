import { IAddress } from "./IAddress";

export interface IUser {
  id: string;
  first_name: string;
  last_name: string;
  address_id: string;
  password: string;
  email: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
  address: IAddress | null;
}

export interface IResetPass {
  email: string;
  newPassword: string;
}

export interface ICreateUser {
  first_name: string;
  last_name: string;
  address_id?: string;
  password: string;
  email: string;
}

export interface IUpdateUser extends Partial<ICreateUser> {}

export interface IUserGroup {
  id: string;
  name: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
}

export interface ICreateUserGroup {
  name: string;
}

export interface IUpdateUserGroup extends Partial<ICreateUserGroup> {}
