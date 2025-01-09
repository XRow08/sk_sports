import { ProductCard } from "../ProductCard";
import { IProduct } from "@/interfaces";

type Props = {
  slice?: number;
  products: IProduct[];
};

export function ProductList({ slice = 10, products }: Props) {
  if (!products) return <></>;
  return (
    <>
      {products.slice(0, slice).map((item) => (
        <ProductCard key={item.id} {...item} />
      ))}
    </>
  );
}
