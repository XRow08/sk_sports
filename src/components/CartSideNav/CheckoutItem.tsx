import { FormatNumber } from "@/helpers";
import useCartItens from "@/hooks/useCartItens";
import { IOrderItem } from "@/interfaces";
import Image from "next/image";
import { TrashIcon, MoreIcon } from "../Icons";
import { LessIcon } from "../Icons/LessIcon";

export function CheckoutItem({ orderItem }: { orderItem: IOrderItem }) {
  const { addToCart, onChangeAmount } = useCartItens();
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
            <h1 className="font-medium">
              Tamanho:{" "}
              <span className="font-semibold">{orderItem.product.size[0]}</span>
            </h1>
            <h1 className="font-medium">
              Personaliza: <span className="font-semibold">Não</span>
            </h1>
          </div>
          <div className="flex items-center gap-2">
            <h1 className="font-semibold">
              {formatToBRL(orderItem.each_price)}
            </h1>
            <h1 className="font-medium text-dark_neutral_11 text-sm">
              {formatToBRL(
                applyDiscount(
                  orderItem.product.price,
                  orderItem.product.discount
                )
              )}
            </h1>
          </div>
        </div>
      </div>
      <div className="min-w-[116px] flex items-center justify-center">
        <div className="rounded-full border-t border-b border-dark_neutral_6 w-full h-8 flex items-center justify-between">
          <div
            onClick={() => onChangeAmount(orderItem.quantity - 1, orderItem)}
            className="bg-dark_neutral_4 hover:bg-dark_neutral_6 rounded-full border border-dark_neutral_6 hover:border-dark_neutral_8 p-1 cursor-pointer transition-all ease-in-out duration-300"
          >
            {orderItem.quantity <= 1 ? <TrashIcon white /> : <LessIcon white />}
          </div>
          <h1 className="font-medium select-none text-dark_neutral_12">
            {orderItem.quantity}
          </h1>
          <div
            onClick={() => addToCart(orderItem.product, orderItem.quantity + 1)}
            className="bg-dark_neutral_4 hover:bg-dark_neutral_6 rounded-full border border-dark_neutral_6 hover:border-dark_neutral_8 p-1 cursor-pointer transition-all ease-in-out duration-300"
          >
            <MoreIcon white />
          </div>
        </div>
      </div>
    </div>
  );
}
