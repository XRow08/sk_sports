export interface ISupplier {
  id: string;
  name: string;
  email: string;
  cnpj: string;
  address_id: string;
  phone: string;
  contact: string;
  site: string;
  observations: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
}

export interface ICreateSupplier {
  name: string;
  email: string;
  cnpj: string;
  address_id: string;
  phone: string;
  contact: string;
  site: string;
  observations: string;
}

export interface IUpdateSupplier extends Partial<ICreateSupplier> {}
