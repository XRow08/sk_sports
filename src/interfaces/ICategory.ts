export interface ICategory {
  id: string;
  name: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
}

export interface ICreateCategory {
  name: string;
  shop_id: string;
}

export interface IUpdateCategory extends Partial<ICreateCategory> {}

export interface ISubCategory {
  id: string;
  name: string;
  category_id: string;
  category: ICategory | null;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
}

export interface ICreateSubCategory {
  name: string;
  category_id: string;
}

export interface IUpdateSubCategory extends Partial<ICreateSubCategory> {}
