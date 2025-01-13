import { IProduct } from "@/interfaces";
import { ProductItem } from "./ProductItem";

export function ProductList({ products }: { products: IProduct[] }) {
  return (
    <div className="grid grid-cols-1 w-full">
      {products.map((item) => <ProductItem key={item.id} item={item} />)}
    </div>
  );
}
