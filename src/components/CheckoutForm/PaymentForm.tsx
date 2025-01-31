import { useOrderStore } from "@/store";
import { CreditForm } from "./PaymentForm/CreditForm";

export function PaymentForm({ control, errors }: any) {
  const { paymentMethod, setPaymentMethod } = useOrderStore();
  const isCard = paymentMethod === "credit-card";
  const isPix = paymentMethod === "pix";

  const methods = [
    {
      label: "Cartão de crédito",
      value: "credit-card",
      condition: isCard,
    },
    {
      label: "Pix",
      value: "pix",
      condition: isPix,
    },
  ];

  return (
    <div className="flex flex-col gap-2 w-full">
      <div className="w-full flex flex-col gap-4">
        {methods.map((e) => (
          <>
            <h1
              onClick={() => setPaymentMethod(e.value)}
              className={`font-medium flex items-center gap-2 cursor-pointer p-3 border rounded-lg ${
                e.condition
                  ? "border-[#3DB9CF] text-[#0D3C48] bg-[#DEF7F9]"
                  : "border-neutral_6 text-neutral_11"
              }`}
            >
              <div
                className={`w-4 h-4 rounded-full border border-neutral_6 transition-all ease-in-out duration-300 ${
                  e.condition
                    ? "border-[#107D98] bg-[#9DDDE7]"
                    : "bg-transparent"
                }`}
              />
              {e.label}
            </h1>
            {isCard && e.value === "credit-card" && (
              <CreditForm control={control} isCredit={isCard} errors={errors} />
            )}
          </>
        ))}
      </div>
    </div>
  );
}
