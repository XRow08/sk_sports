import { FormatNumber } from "@/helpers/FormatNumber";
import { IProduct } from "@/interfaces";
import Image from "next/image";
import Link from "next/link";

export function ProductCard(item: IProduct) {
  const { formatToBRL, applyDiscount } = FormatNumber;
  const discountValue = applyDiscount(item.price, item.discount);
  return (
    <Link href={`/products/${item.slug}`}>
      <div className="flex flex-col items-center w-[305px] h-[465px]">
        <Image
          src={item.image_url}
          alt={item.name}
          height={10000}
          width={10000}
          className="w-full min-h-[339px] rounded-2xl object-cover"
        />
        <p className="text-lg font-bold text-start w-full">{item.name}</p>
        <div className="flex justify-between w-full">
          <div className="flex items-baseline gap-1">
            <p className="font-extrabold text-xl">{formatToBRL(item.price)}</p>
            <p className="font-medium text-neutral_11">
              {formatToBRL(discountValue)}
            </p>
          </div>
          <p className="text-green_9 font-bold">PIX</p>
        </div>
        <div className="flex justify-between w-full">
          <p className="font-bold text-lg">{formatToBRL(discountValue)}</p>
          <p className="text-neutral_11">Cartão</p>
        </div>
      </div>
    </Link>
  );
}
