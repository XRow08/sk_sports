export interface IMenu {
  id: string;
  user_id: string | null;
  customer_id: string | null;
  name: string;
  description: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
}

export interface ICreateMenu {
  user_id?: string;
  customer_id?: string;
  name: string;
  description: string;
}

export interface IUpdateMenu extends Partial<ICreateMenu> {}

export interface IMenuCategory {
  id: string;
  name: string;
  image_url: string;
  shop_id: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
}

export interface ICreateMenuCategory {
  name: string;
  image_url: string;
  shop_id: string;
}

export interface IUpdateMenuCategory extends Partial<ICreateMenuCategory> {}
