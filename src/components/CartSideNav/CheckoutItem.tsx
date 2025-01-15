import { FormatNumber } from "@/helpers";
import { IOrderItem } from "@/interfaces";
import Image from "next/image";

export function CheckoutItem({ orderItem }: { orderItem: IOrderItem }) {
  const { formatToBRL, applyDiscount } = FormatNumber;

  return (
    <div className="flex gap-8 w-full min-h-[122px] border-b border-dark_neutral_6 py-4">
      <div className="flex w-full">
        <Image
          src={orderItem.product.image_url}
          alt={orderItem.product.name}
          width={10000}
          height={10000}
          draggable={false}
          className="min-w-[90px] w-[90px] rounded-lg object-cover mr-2"
        />
        <div className="h-full w-full flex flex-col justify-between text-dark_neutral_12">
          <h1 className="font-medium">{orderItem.product.name}</h1>
          <div className="flex items-center w-full gap-6">
            <h1 className="font-medium uppercase">
              Tamanho:{" "}
              <span className="font-semibold">{orderItem.product.size[0]}</span>
            </h1>
            <h1 className="font-medium">
              Personaliza: <span className="font-semibold">Não</span>
            </h1>
          </div>
          <div className="flex items-center gap-2">
            <h1 className="font-semibold">
              {formatToBRL(
                applyDiscount(
                  orderItem.product.price,
                  orderItem.product.discount
                )
              )}
            </h1>
            <h1 className="font-medium text-dark_neutral_11 text-sm line-through">
              {formatToBRL(orderItem.each_price)}
            </h1>
          </div>
        </div>
      </div>
    </div>
  );
}
