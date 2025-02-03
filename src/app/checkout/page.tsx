"use client";
import { CheckoutItem } from "@/components/CartSideNav/CheckoutItem";
import { CheckoutForm } from "@/components/CheckoutForm";
import { PixPayment } from "@/components/Payments/PixPayment";
import { FormatNumber } from "@/helpers";
import useCartItens from "@/hooks/useCartItens";
import { useCreateOrder } from "@/hooks/useCreateOrder";
import { useOrderStore } from "@/store";

export default function Checkout() {
  const { items, totalPrice } = useCartItens();
  const { pixResponse, order } = useOrderStore();
  const { formatToBRL } = FormatNumber;
  useCreateOrder();

  return (
    <section className="flex flex-col w-full min-h-screen h-full">
      <header className="h-[64px] w-full fixed top-0 left-0 z-10 bg-dark_neutral_1 flex items-center justify-center border-b border-dark_neutral_6">
        <h1 className="text-dark_neutral_12 font-extrabold text-2xl">
          Pagamento
        </h1>
      </header>
      <section className="flex flex-col-reverse lg:flex-row items-start min-h-screen h-full text-dark_neutral_12 relative">
        <div className="lg:pt-[64px] w-full lg:w-1/2 px-4 lg:px-20 pb-[88px] flex flex-col items-start justify-start">
          {!pixResponse ? <CheckoutForm /> : <PixPayment />}
        </div>
        <div className=" lg:fixed lg:right-0 lg:top-10 w-full lg:w-1/2 h-full max-h-[calc(100vh-40px)] overflow-auto lg:bg-dark_neutral_1 px-4 lg:px-20 pt-24 lg:pt-[64px] pb-4">
          <div className="flex flex-col gap-3 border-b border-dark_neutral_6 text-neutral_11 lg:text-dark_neutral_11 pb-4">
            <h1 className="text-lg flex items-center justify-between">
              Subtotal{" "}
              <span className="text-base">{formatToBRL(totalPrice)}</span>
            </h1>
            <h1 className="text-lg flex items-center justify-between">
              Desconto{" "}
              <span className="text-base">
                {formatToBRL(order?.discount || 0)}
              </span>
            </h1>
            <h1 className="text-lg flex items-center justify-between">
              Frete{" "}
              <span className="text-base">
                {formatToBRL(order?.portage || 0)}
              </span>
            </h1>
            <h1 className="text-lg flex items-center justify-between">
              Juros{" "}
              <span className="text-base">
                {formatToBRL(order?.addition || 0)}
              </span>
            </h1>
            <h1 className="text-lg flex items-center justify-between">
              Total
              <span className="text-xl font-semibold">
                {formatToBRL(order?.total_price || 0)}
              </span>
            </h1>
          </div>
          <div className="mt-4 hidden lg:block">
            {items.map((e) => (
              <CheckoutItem key={e.id} orderItem={e} />
            ))}
          </div>
        </div>
      </section>
    </section>
  );
}
