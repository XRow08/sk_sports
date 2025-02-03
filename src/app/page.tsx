"use client";
import { Button } from "@/components/Button";
import { CarouselBanners } from "@/components/CarouselBanners";
import { CategorieList } from "@/components/Categories/CategorieList";
import { CollectionCard } from "@/components/Collection/CollectionCard";
import { ProductList } from "@/components/Products/ProductList";
import { bannersHome1, bannersHome2 } from "@/constants";
import { collectionsMock } from "@/constants/mock";
import { ProductService } from "@/services";
import { useQuery } from "@tanstack/react-query";

export default function Home() {
  const { data } = useQuery({
    queryKey: ["findAll"],
    queryFn: () => ProductService.findAll(),
  });

  return (
    <section>
      <CarouselBanners banners={bannersHome1} />

      <CategorieList />

      <div className="py-[88px]">
        <h1 className="text-[28px] font-bold pb-4">Lançamentos</h1>
        <div className="flex flex-wrap gap-5">
          <ProductList slice={4} products={data!} />
        </div>
      </div>

      <CarouselBanners banners={bannersHome2} />

      <div className="py-[88px]">
        <h1 className="text-[28px] font-bold pb-4">Nossas coleções</h1>
        <div className="flex flex-wrap gap-5">
          {collectionsMock.map((item) => (
            <CollectionCard key={item.id} {...item} />
          ))}
        </div>
      </div>

      <div className="py-[88px]">
        <h1 className="text-[28px] font-bold pb-4">Talvez você goste</h1>
        <div className="flex flex-wrap gap-5">
          <ProductList slice={4} products={data!} />
        </div>
      </div>
    </section>
  );
}
