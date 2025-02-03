import { FormatNumber } from "@/helpers";
import useCartItens from "@/hooks/useCartItens";
import { TrashIcon, MoreIcon } from "../Icons";
import { IOrderItem } from "@/interfaces";
import Image from "next/image";
import { LessIcon } from "../Icons/LessIcon";

export function CartList({ items }: { items: IOrderItem[] }) {
  const { addToCart, onChangeAmount } = useCartItens();
  const { formatToBRL, applyDiscount } = FormatNumber;
  
  return (
    <div className="flex flex-col w-full select-none max-h-[75vh] overflow-y-auto">
      {items.map((orderItem) => (
        <div
          key={orderItem.id}
          className="flex gap-8 w-full min-h-[122px] border-b border-neutral_6 py-4 px-4"
        >
          <div className="flex w-full">
            <Image
              src={orderItem.product?.image_url || ""}
              alt={orderItem.product?.name || ""}
              width={10000}
              height={10000}
              draggable={false}
              className="min-w-[90px] w-[90px] rounded-lg object-cover mr-2"
            />
            <div className="h-full w-full flex flex-col justify-between">
              <h1 className="font-medium">{orderItem.product?.name}</h1>
              <div className="flex items-center w-full gap-6">
                <h1 className="font-medium">
                  Tamanho:{" "}
                  <span className="font-semibold">{orderItem.size}</span>
                </h1>
                <h1 className="font-medium">
                  Personaliza:{" "}
                  <span className="font-semibold">
                    {!!orderItem.perso_text ? "Sim" : "Não"}
                  </span>
                </h1>
              </div>
              <div className="flex items-center gap-2">
                <h1 className="font-semibold">
                  {formatToBRL(
                    applyDiscount(
                      orderItem.product?.price,
                      orderItem.product?.discount
                    )
                  )}
                </h1>
                <h1 className="font-medium text-neutral_11 text-sm line-through">
                  {formatToBRL(orderItem.each_price)}
                </h1>
              </div>
            </div>
          </div>
          <div className="min-w-[116px] flex items-center justify-center">
            <div className="rounded-full border-t border-b border-neutral_6 w-full h-8 flex items-center justify-between">
              <div
                onClick={() =>
                  onChangeAmount(orderItem.quantity - 1, orderItem)
                }
                className="bg-neutral_4 hover:bg-neutral_6 rounded-full border border-neutral_6 hover:border-neutral_8 p-1 cursor-pointer transition-all ease-in-out duration-300"
              >
                {orderItem.quantity <= 1 ? <TrashIcon /> : <LessIcon />}
              </div>
              <h1 className="font-medium select-none">{orderItem.quantity}</h1>
              <div
                onClick={() =>
                  addToCart({
                    product: orderItem.product!,
                    amount: orderItem.quantity + 1,
                    size: orderItem.size,
                    perso_text: orderItem.perso_text,
                  })
                }
                className="bg-neutral_4 hover:bg-neutral_6 rounded-full border border-neutral_6 hover:border-neutral_8 p-1 cursor-pointer transition-all ease-in-out duration-300"
              >
                <MoreIcon />
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
