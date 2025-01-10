import { ArrowIcon } from "@/components/Icons";
import { ProductDescription, ProductInfo } from "@/components/Products";
import { Reviews } from "@/components/Reviews";
import { ProductService } from "@/services";
import { notFound } from "next/navigation";

type Props = { params: { slug: string } };

export default async function ProductPage({ params }: Props) {
  const product = await ProductService.findOneBySlug(params.slug);
  const productRates = await ProductService.findAllProductRate(product.id);
  if (!product) notFound();

  return (
    <section className="flex flex-col min-w-[1280px] w-full max-w-[1440px] items-start justify-start gap-3">
      <div className="flex items-center w-full">
        <h1 className="text-sm">Página inicial</h1>
        <ArrowIcon size={16} />
        <p className="text-sm font-bold">{product.name}</p>
      </div>

      <ProductInfo {...product} />
      <ProductDescription {...product} />
      <Reviews rates={productRates} product={product} />
    </section>
  );
}
