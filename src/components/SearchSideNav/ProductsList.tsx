import { FormatNumber } from "@/helpers";
import { IProduct } from "@/interfaces";
import Image from "next/image";
import Link from "next/link";

export function ProductsList({ items }: { items: IProduct[] }) {
  const { formatToBRL, applyDiscount } = FormatNumber;

  return (
    <div className="flex flex-col w-full select-none">
      {items.map((product) => (
        <Link href={`/products/${product.slug}`}>
          <div className="flex gap-2 w-full min-h-[122px] h-[122px] border-b border-neutral_6 py-4 px-4">
            <Image
              src={product.image_url}
              alt={product.name}
              width={10000}
              height={10000}
              draggable={false}
              className="min-w-[90px] w-[90px] rounded-lg object-cover mr-2"
            />
            <div className="h-full w-full flex flex-col justify-between">
              <h1 className="font-medium">{product.name}</h1>
              <div className="flex items-center w-full justify-between">
                <div className="flex items-center gap-2">
                  <h1 className="font-semibold">
                    {formatToBRL(product.price)}
                  </h1>
                  <h1 className="font-medium text-neutral_11 text-sm">
                    {formatToBRL(
                      applyDiscount(product.price, product.discount)
                    )}
                  </h1>
                </div>
                <h1 className="font-bold text-green_9">PIX</h1>
              </div>
              <div className="flex items-center w-full justify-between">
                <h1 className="font-medium text-neutral_11 text-sm">
                  {formatToBRL(applyDiscount(product.price, product.discount))}
                </h1>
                <h1 className="font-medium text-neutral_11">Cartão</h1>
              </div>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}
