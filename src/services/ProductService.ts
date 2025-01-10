import Api from "@/helpers/Api";
import {
  ICreateProduct,
  IProduct,
  ICreateProductBalance,
  IProductImage,
  IProductRate,
  ICreateProductRate,
  IUpdateProduct,
} from "@/interfaces";

export const ProductService = {
  async createOne(payload: ICreateProduct) {
    const { data } = await Api.post<IProduct>("/products", payload);
    return data;
  },

  async createProductImages(payload: { product_id: string; file: File }) {
    const { data } = await Api.post<IProduct>("/product-images/image", payload);
    return data;
  },

  async createProductBalance(payload: ICreateProductBalance) {
    const { data } = await Api.post<IProduct>("/product-balance", payload);
    return data;
  },

  async findOneById(id: string | number) {
    const { data } = await Api.get<IProduct>(`/products/${id}`);
    return data;
  },

  async findOneBySlug(slug: string | number) {
    const { data } = await Api.get<IProduct>(`/products/slug/${slug}`);
    return data;
  },

  async findAll(page = "1", limit = "10") {
    const params = new URLSearchParams({ page, limit }).toString();
    const { data } = await Api.get<IProduct[]>(`/products?${params}`);
    return data;
  },

  async findAllByShopId(shop_id: string, page = "1", limit = "10") {
    const params = new URLSearchParams({ page, limit }).toString();
    const { data } = await Api.get(`/products/shop/${shop_id}?${params}`);
    return data as IProduct[];
  },

  async findAllBySearch(search: string, page = "1", limit = "10") {
    const params = new URLSearchParams({ page, limit }).toString();
    const { data } = await Api.get(`/products/search/${search}?${params}`);
    return data as IProduct[];
  },

  async findAllBySearchByShop(
    id: string,
    search: string,
    page = "1",
    limit = "10"
  ) {
    const params = new URLSearchParams({ page, limit }).toString();
    const url = `/products/shop/${id}/search/${search}?${params}`;
    const { data } = await Api.get(url);
    return data as IProduct[];
  },

  async findProductImages(productId: string) {
    const { data } = await Api.get(`/product-images/product/${productId}`);
    return data as IProductImage[];
  },

  async findProductRate(productId: string) {
    const { data } = await Api.get(`/rate-product/productId/${productId}`);
    console.log(data);
    return data as number;
  },

  async findAllProductRate(productId: string) {
    const url = `/rate-product/productId/${productId}/comments`;
    const { data } = await Api.get(url);
    return data as IProductRate[];
  },

  async rateProduct(payload: ICreateProductRate) {
    const { data } = await Api.post(`/rate-product`, payload);
    return data as IProductRate;
  },

  async updateRateProduct(id: string, payload: Partial<ICreateProductRate>) {
    const { data } = await Api.patch(`/rate-product/${id}`, payload);
    return data as IProductRate;
  },

  async updateById(id: string, payload: IUpdateProduct) {
    const { data } = await Api.patch<IProduct>(`/products/${id}`, payload);
    return data;
  },

  async deleteById(id: string) {
    const { data } = await Api.delete(`/products/${id}`);
    return data;
  },
};
