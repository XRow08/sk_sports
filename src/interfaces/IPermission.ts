export interface IPermission {
  id: string;
  name: string;
  description: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
}

export interface ICreatePermission {
  name: string;
  description: string;
}

export interface IUpdatePermission extends Partial<ICreatePermission> {}
