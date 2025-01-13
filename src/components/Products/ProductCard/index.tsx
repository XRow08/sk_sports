import { FormatNumber } from "@/helpers/FormatNumber";
import { IProduct } from "@/interfaces";
import Image from "next/image";
import Link from "next/link";

export function ProductCard(item: IProduct) {
  const { formatToBRL, applyDiscount } = FormatNumber;
  const discountValue = applyDiscount(item.price, item.discount);
  return (
    <Link href={`/products/${item.slug}`}>
      <div className="flex flex-col items-center w-[165px] lg:w-[305px] lg:h-[465px]">
        {item.image_url && (
          <Image
            src={item.image_url}
            alt={item.name}
            height={10000}
            width={10000}
            className="w-full h-[165px] lg:h-[339px] lg:min-h-[339px] rounded-2xl object-cover"
          />
        )}
        <p className="text-sm lg:text-lg font-bold text-start w-full">
          {item.name}
        </p>
        <div className="flex justify-between w-full">
          <div className="flex items-baseline gap-1">
            <p className="font-extrabold text-sm lg:text-xl">
              {formatToBRL(item.price)}
            </p>
            <p className="font-medium text-xs lg:text-base text-neutral_11 line-through">
              {formatToBRL(discountValue)}
            </p>
          </div>
          <p className="hidden lg:block text-green_9 font-bold">PIX</p>
        </div>
        <div className="flex justify-between w-full">
          <p className="font-bold text-sm lg:text-lg">
            {formatToBRL(discountValue)}
          </p>
          <p className="text-neutral_11 text-sm lg:text-base">Cartão</p>
        </div>
      </div>
    </Link>
  );
}
