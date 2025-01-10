"use client";
import { CheckoutItem } from "@/components/CartSideNav/CheckoutItem";
import { ContactIcon, LogoIcon } from "@/components/Icons";
import { FormatNumber } from "@/helpers";
import useCartItens from "@/hooks/useCartItens";

export default function Checkout() {
  const { items, totalPrice } = useCartItens();
  const { formatToBRL, applyDiscount } = FormatNumber;

  return (
    <section className="flex flex-col w-screen min-h-screen h-screen">
      <header className="h-[64px] w-full bg-dark_neutral_1 flex items-center justify-center border-b border-dark_neutral_6">
        <h1 className="text-dark_neutral_12 font-extrabold text-2xl">
          Pagamento
        </h1>
      </header>
      <section className="flex items-start h-full text-dark_neutral_12">
        <div className="pt-[64px] w-full px-20 pb-[88px] flex flex-col items-start justify-start">
          <LogoIcon size={64} />
          <div className="flex items-center gap-2 mt-8">
            <div className="h-6 w-6 border border-neutral_6 bg-neutral_3 rounded-lg flex items-center justify-center">
              <ContactIcon />
            </div>
            <h1 className="text-neutral_12 font-semibold text-xl">Contato</h1>
          </div>
        </div>
        <div className="w-full h-full bg-dark_neutral_1 px-20 pt-[64px] pb-4">
          <div className="flex flex-col gap-3 border-b border-dark_neutral_6 pb-4">
            <h1 className="text-lg text-dark_neutral_11 flex items-center justify-between">
              Subtotal{" "}
              <span className="text-base">{formatToBRL(totalPrice)}</span>
            </h1>
            <h1 className="text-lg text-dark_neutral_11 flex items-center justify-between">
              Frete <span className="text-base">{formatToBRL(totalPrice)}</span>
            </h1>
            <h1 className="text-lg text-dark_neutral_11 flex items-center justify-between">
              Juros <span className="text-base">{formatToBRL(totalPrice)}</span>
            </h1>
            <h1 className="text-lg flex items-center justify-between">
              Total
              <span className="text-xl font-semibold">
                {formatToBRL(totalPrice)}
              </span>
            </h1>
          </div>
          <div className="mt-4">
            {items.map((e) => (
              <CheckoutItem orderItem={e} />
            ))}
          </div>
        </div>
      </section>
    </section>
  );
}
