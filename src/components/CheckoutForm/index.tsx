import { Controller, useForm } from "react-hook-form";
import { CardIcon, ContactIcon, DeliverIcon } from "../Icons";
import { yupResolver } from "@hookform/resolvers/yup";
import { checkoutSchema } from "@/validators";
import { Input } from "../Input";
import { ContactForm } from "./ContactForm";
import { DeliverForm } from "./DeliverForm";
import { useState } from "react";
import { PaymentForm } from "./PaymentForm";

export function CheckoutForm() {
  const [paymentMethod, setPaymentMethod] = useState("");
  const {
    handleSubmit,
    control,
    setValue,
    watch,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(checkoutSchema),
  });

  async function onSave() {}
  return (
    <form onSubmit={handleSubmit(onSave)} className="flex flex-col w-full">
      <div className="flex items-center gap-2 mb-4 mt-8">
        <div className="h-6 w-6 border border-neutral_6 bg-neutral_3 rounded-lg flex items-center justify-center">
          <ContactIcon />
        </div>
        <h1 className="text-neutral_12 font-semibold text-xl">Contato</h1>
      </div>

      <ContactForm control={control} errors={errors} />

      <div className="flex items-center gap-2 mb-4 mt-8">
        <div className="h-6 w-6 border border-neutral_6 bg-neutral_3 rounded-lg flex items-center justify-center">
          <DeliverIcon checkout />
        </div>
        <h1 className="text-neutral_12 font-semibold text-xl">Entrega</h1>
      </div>

      <DeliverForm
        watch={watch}
        control={control}
        setValue={setValue}
        errors={errors}
      />

      <div className="flex flex-col justify-start p-4 mt-8 border-[1.5px] border-neutral_6 rounded-lg">
        <div className="flex items-center gap-2 mb-4">
          <div className="h-6 w-6 border border-neutral_6 bg-neutral_3 rounded-lg flex items-center justify-center">
            <CardIcon />
          </div>
          <h1 className="text-neutral_12 font-semibold text-xl">
            Selecione o método de pagamento
          </h1>
        </div>
        <PaymentForm control={control} errors={errors} />
      </div>
    </form>
  );
}
