import { ICategory } from "./ICategory";
import { IFile } from "./IFile";

export interface IProduct {
  id: string;
  name: string;
  description: string;
  slug: string;
  price: number;
  discount: number;
  image_url: string;
  indicate_for: string;
  sleeve: string;
  composition: string;
  collar: string;
  tech: string;
  cor: string;
  gender: string;
  size: string[];
  categories: string[];
  club: string;
  rateProduct: IProductRate[];
  productImages: IProductImage[];
  images: string[];
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
}

export interface ICreateProduct {
  name: string;
  description: string;
  price: number;
  discount: number;
  image_url: string;
  slug: string;
  categories: ICategory | null;
  rateProduct: string[];
  productImages: IProductImage[];
  images: string[];
  cor: string;
}

export interface IUpdateProduct extends Partial<ICreateProduct> {}

export interface ICreateProductBalance {
  shop_id: string;
  product_id: string;
  balance_min: number;
  balance: number;
}

export interface IProductImage {
  id: string;
  file_id: string;
  product_id: string;
  file: IFile;
  product: IProduct;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
}

export interface IUpdateProductImage {
  file_id?: string;
  product_id?: string;
}

export interface IDailyOffer {
  id: string;
  shop_id: string;
  product_id: string;
  product: IProduct | null;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
}

export interface ICreateDailyOffer {
  shop_id: string;
  product_id: string;
}

export interface IUpdateDailyOffer extends Partial<ICreateDailyOffer> {}

export interface IProductRate {
  id: string;
  rate: number;
  title: string;
  likes: number;
  user_id: string;
  comment: string;
  images: string[];
  product_id: string;
  product: IProduct;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
}

export interface ICreateProductRate {
  title: string;
  rate: number;
  product_id: string;
  user_id: string;
  comment: string;
  images: string[];
  likes: number;
}

export interface IUpdateProductRate extends Partial<ICreateProductRate> {}
