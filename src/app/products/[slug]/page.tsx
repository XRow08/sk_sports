"use client";
import { ArrowIcon } from "@/components/Icons";
import { ProductDescription, ProductInfo } from "@/components/Products";
import { Reviews } from "@/components/Reviews";
import { ProductService } from "@/services";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";

type Props = { params: { slug: string } };

export default function ProductPage({ params }: Props) {
  const { data: product, isLoading } = useQuery({
    queryKey: ["findAll", params.slug],
    queryFn: () => ProductService.findOneBySlug(params.slug),
  });

  if (!product) return <></>;

  return (
    <section className="flex flex-col min-w-[1280px] w-full items-start justify-start gap-3">
      <div className="flex items-center w-full">
        <h1 className="text-sm">Página inicial</h1>
        <ArrowIcon size={16} />
        <p className="text-sm font-bold">{product.name}</p>
      </div>

      <div className="flex gap-6 w-full">
        <div className="flex items-start">
          {product.images.length > 0 && (
            <div className="flex flex-col justify-between">
              {product.images.map((e) => (
                <Image
                  src={e}
                  alt={product.name}
                  width={10000}
                  height={10000}
                  draggable={false}
                  className="w-[86px] rounded-lg"
                />
              ))}
            </div>
          )}
          <Image
            src={product.image_url}
            alt={product.name}
            width={10000}
            height={10000}
            draggable={false}
            className="min-w-[548px] w-[548px] h-[548px] rounded-lg object-cover"
          />
        </div>
        <ProductInfo {...product} />
      </div>

      <ProductDescription {...product} />

      <Reviews rate={3.4} />
    </section>
  );
}
