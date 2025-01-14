"use client";
import { Button } from "@/components/Button";
import { CategorieList } from "@/components/Categories/CategorieList";
import { CollectionCard } from "@/components/Collection/CollectionCard";
import { ProductList } from "@/components/Products/ProductList";
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
      <div className="bg-[url(/images/banners/bannerHome1.png)] bg-cover bg-bottom rounded-2xl w-[345px] lg:w-full h-[206px] lg:h-[490px] flex flex-col justify-center gap-2 lg:gap-14 items-start p-4 lg:p-8">
        <div className="bg-green-900 border border-green-500 font-medium text-white px-6 py-2 rounded-full lg:text-2xl">
          Promoção imperdível
        </div>
        <h1 className="text-white lg:text-6xl font-bold">
          Compre três <br /> e pague duas!
        </h1>
        <Button size="big" bgColor="white">
          Saiba mais
        </Button>
      </div>

      <CategorieList />

      <div className="py-[88px]">
        <h1 className="text-[28px] font-bold pb-4">Lançamentos</h1>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
          <ProductList slice={4} products={data!} />
        </div>
      </div>

      <div className="hidden bg-[url(/images/banners/bannerHome2.png)] bg-cover bg-center rounded-2xl w-full h-[369px] lg:flex flex-col justify-center gap-6 items-start p-8 my-[88px]">
        <h1 className="text-white text-6xl font-bold">Utilize nosso cartão</h1>
        <div className="bg-green-900 border border-green-500 font-medium text-white px-6 py-2 rounded-full text-2xl mb-10">
          Compre3Leve2
        </div>

        <Button size="big" bgColor="white">
          Usar Cupom
        </Button>
      </div>

      <div className="py-[88px]">
        <h1 className="text-[28px] font-bold pb-4">Nossas coleções</h1>
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-5">
          {collectionsMock.map((item) => (
            <CollectionCard key={item.id} {...item} />
          ))}
        </div>
      </div>

      <div className="py-[88px]">
        <h1 className="text-[28px] font-bold pb-4">Talvez você goste</h1>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
          <ProductList slice={4} products={data!} />
        </div>
      </div>
    </section>
  );
}
