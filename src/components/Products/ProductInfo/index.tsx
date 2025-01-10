"use client";
import { ArrowBack, DeliverIcon } from "@/components/Icons";
import { FormatNumber } from "@/helpers";
import { IProduct } from "@/interfaces";
import { SelectSize } from "./SelectSize";
import { Personalization } from "./Personalization";
import { Button } from "@/components/Button";
import { BuyIcon } from "@/components/Icons/BuyIcon";
import { AddCardIcon } from "@/components/Icons/AddCartIcon";
import useCartItens from "@/hooks/useCartItens";
import Image from "next/image";

export function ProductInfo(product: IProduct) {
  const { addToCart, items } = useCartItens();
  const { formatToBRL, applyDiscount } = FormatNumber;
  const isOnCart = items.find((e) => e.product_id === product.id);

  return (
    <div className="flex gap-6 w-full">
      <div className="flex items-start gap-4">
        {product.images.length > 0 && (
          <div className="flex flex-col w-[86px] gap-2 py-2">
            {product.images.slice(0, 6).map((e) => (
              <Image
                src={e}
                alt={product.name}
                width={10000}
                height={10000}
                draggable={false}
                className="w-full h-[82px] rounded-lg object-cover"
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
      <div className="flex flex-col w-full">
        <div>
          <h1 className="text-sm">324 Vendidos</h1>
        </div>
        <div>
          <h1 className="text-[28px] font-bold">{product.name}</h1>
          <div className="flex items-baseline justify-between">
            <div className="flex items-baseline gap-2">
              <h1 className="text-[28px] font-extrabold">
                {formatToBRL(applyDiscount(product.price, product.discount))}
              </h1>
              <h1 className="text-[20px] text-neutral_11 font-semibold">
                {formatToBRL(product.price)}
              </h1>
            </div>
            <h1 className="font-medium text-green_9">
              Economize 10% à vista via PIX
            </h1>
          </div>
        </div>

        <div className="w-full h-[1px] bg-neutral_6 mb-6 mt-5" />

        <div className="flex items-center justify-between bg-neutral_3 border mb-6 border-neutral_6 py-2 px-3 rounded-lg">
          <div className="flex items-center gap-2">
            <DeliverIcon />
            <h1 className="text-green_9 font-bold">Frete grátis disponível</h1>
          </div>
          <div className="flex items-center gap-2">
            <ArrowBack />
            <h1 className="text-neutral_12 font-medium">
              <span className="text-[#0D3C48] font-bold">Devolução grátis</span>{" "}
              em até 7 dias
            </h1>
          </div>
        </div>
        <SelectSize sizes={product.size} />
        <Personalization />
        <div className="flex items-center gap-3 w-full mt-6">
          <Button bgColor="black" className="w-full">
            <BuyIcon /> Comprar agora
          </Button>
          <Button
            onClick={() =>
              addToCart(product, isOnCart ? isOnCart.quantity + 1 : 1)
            }
            bgColor="white-transparent"
            className="w-full font-semibold"
          >
            <AddCardIcon /> Adicionar ao carrinho
          </Button>
        </div>
      </div>
    </div>
  );
}
