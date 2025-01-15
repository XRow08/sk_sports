export interface IAddress {
  id: string;
  address: string;
  city: string;
  state: string;
  district: string;
  complement: string;
  cep: string;
  number: number;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
}

export interface ICreateAddress {
  address?: string;
  city?: string;
  state?: string;
  district?: string;
  complement?: string;
  cep?: string;
  number?: number;
}

export interface IUpdateAddress extends Partial<ICreateAddress> {}

export interface ITypeAddress {
  id: string;
  name: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
}

export interface ICreateTypeAddress {
  name: string;
}

export interface IUpdateTypeAddress extends Partial<ICreateTypeAddress> {}
