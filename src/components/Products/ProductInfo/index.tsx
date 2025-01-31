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
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store";
import toast from "react-hot-toast";

export function ProductInfo(product: IProduct) {
  const { addToCart, items } = useCartItens();
  const { formatToBRL, applyDiscount } = FormatNumber;
  const isOnCart = items.find((e) => e.product_id === product.id);
  const [isZoomed, setIsZoomed] = useState(false);
  const { user, setShowAuth, setStepAuth } = useAuthStore();
  const [persoValues, setPersoValues] = useState({
    perso_text: "",
    perso_number: "",
  });
  const [size, setSize] = useState("");
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const router = useRouter();

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const { left, top, width, height } =
      e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - left) / width) * 100;
    const y = ((e.clientY - top) / height) * 100;
    setMousePosition({ x, y });
  };

  const onBuyNow = () => {
    if (!size) return toast.error("Selecione o tamanho do produto");
    addToCart(product, 1);
    if (user) {
      router.push("/checkout");
    } else {
      setShowAuth(true);
      setStepAuth(0);
    }
  };

  const handlePersoValues = (values: {
    perso_text: string;
    perso_number: string;
  }) => {
    setPersoValues(values);
  };

  const handleAddToCart = () => {
    if (!size) return toast.error("Selecione o tamanho do produto");
    addToCart(
      product,
      isOnCart ? isOnCart.quantity + 1 : 1,
      size,
      Number(persoValues.perso_number),
      persoValues.perso_text
    );
  };

  return (
    <div className="flex flex-col lg:flex-row gap-6 w-full">
      <div className="flex flex-col-reverse lg:flex-row items-start gap-4">
        {product.images.length > 0 && (
          <div className="flex flex-row lg:flex-col w-[86px] gap-2 py-2">
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
        {product.image_url && (
          <div
            className="relative min-w-[343px] w-[343px] lg:min-w-[548px] lg:w-[548px] h-[343px] lg:h-[548px] overflow-hidden rounded-lg cursor-zoom-in"
            onMouseEnter={() => setIsZoomed(true)}
            onMouseLeave={() => setIsZoomed(false)}
            onMouseMove={handleMouseMove}
          >
            <Image
              src={product.image_url}
              alt={product.name}
              width={10000}
              height={10000}
              draggable={false}
              className={`absolute w-full h-full object-cover transition-transform duration-200 ${
                isZoomed ? "scale-[2.0]" : "scale-100"
              }`}
              style={
                isZoomed
                  ? {
                      transformOrigin: `${mousePosition.x}% ${mousePosition.y}%`,
                    }
                  : undefined
              }
            />
          </div>
        )}
      </div>
      <div className="flex flex-col w-full">
        <div>
          <h1 className="text-sm">0 Vendidos</h1>
        </div>
        <div>
          <h1 className="text-xl lg:text-[28px] font-bold mb-2">
            {product.name}
          </h1>
          <div className="flex flex-col lg:flex-row items-baseline justify-between">
            <div className="flex items-baseline gap-2">
              <h1 className="text-xl lg:text-[28px] font-extrabold">
                {formatToBRL(applyDiscount(product.price, product.discount))}
              </h1>
              <h1 className="lg:text-[20px] text-neutral_11 font-semibold line-through">
                {formatToBRL(product.price)}
              </h1>
            </div>
            <h1 className="font-medium text-green_9">
              Economize {product.discount}% à vista via PIX
            </h1>
          </div>
        </div>

        <div className="w-full h-[1px] bg-neutral_6 mb-6 mt-5" />

        <div className="flex flex-col lg:flex-row items-center justify-between bg-neutral_3 border mb-6 border-neutral_6 py-2 px-3 rounded-lg">
          <div className="flex items-center gap-2">
            {product.price > 259 && (
              <>
                <DeliverIcon />
                <h1 className="text-green_9 font-bold">
                  Frete grátis disponível
                </h1>
              </>
            )}
          </div>
          <div className="flex items-center gap-2">
            <ArrowBack />
            <h1 className="text-neutral_12 font-medium">
              <span className="text-[#0D3C48] font-bold">Devolução grátis</span>{" "}
              em até 7 dias
            </h1>
          </div>
        </div>
        <SelectSize sizes={product.size} onChange={setSize} />
        <Personalization onChange={handlePersoValues} />
        <div className="flex flex-col lg:flex-row items-center gap-3 w-full mt-6">
          <Button onClick={onBuyNow} bgColor="black" className="w-full">
            <BuyIcon /> Comprar agora
          </Button>
          <Button
            onClick={handleAddToCart}
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
