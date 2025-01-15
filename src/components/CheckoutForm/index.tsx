import { useForm } from "react-hook-form";
import { CardIcon, ContactIcon, DeliverIcon } from "../Icons";
import { yupResolver } from "@hookform/resolvers/yup";
import { checkoutSchema } from "@/validators";
import { ContactForm } from "./ContactForm";
import { DeliverForm } from "./DeliverForm";
import { PaymentForm } from "./PaymentForm";
import { Button } from "../Button";
import { useOrderStore } from "@/store";
import { AddressService, AppMaxService, UserService } from "@/services";
import { ICreateAddress, ICreatePurchase, IPixResponse } from "@/interfaces";
import toast from "react-hot-toast";

export function CheckoutForm() {
  const { paymentMethod, setPaymentMethod, order, setPixResponse } = useOrderStore();
  const {
    handleSubmit,
    control,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(checkoutSchema),
  });

  async function createAddress(payload: ICreateAddress) {
    if (!order) return;
    try {
      const address = await AddressService.createOne({
        address: payload.address,
        cep: payload.cep,
        city: payload.city,
        complement: payload.complement,
        district: payload.district,
        number: payload.number,
        state: payload.state,
      });
      await UserService.updateById(order.user_id, {
        address_id: address.id,
      });
      return address;
    } catch (error) {
      console.error(error);
      toast.error("Erro ao salvar endereço");
    }
  }

  async function onSave(values: any) {
    try {
      console.log(order);
      if (!order) return;
      await createAddress(values);
      const payload: ICreatePurchase = {
        customer: {
          email: values.email,
          phone: values.cellphone,
          cpf: values.cpf,
        },
        order_id: order?.id,
        paymentMethod: paymentMethod,
        expiration_date: values.expiration_date,
        token: values.token,
        installments: values.installments,
      };
      const response: IPixResponse = await AppMaxService.createOrder(payload);
      if (response.success) {
        setPixResponse(response);
        toast.success("Compra realizada com sucesso");
      } else {
        toast.error("Erro ao finalizar compra");
      }
    } catch (error) {
      toast.error("Erro ao finalizar compra");
      console.error("Error submitting form:", error);
    }
  }

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

      <DeliverForm control={control} setValue={setValue} errors={errors} />

      <div className="flex flex-col justify-start p-4 mt-8 border-[1.5px] border-neutral_6 rounded-lg">
        <div className="flex items-center gap-2 mb-4">
          <div className="h-6 w-6 border border-neutral_6 bg-neutral_3 rounded-lg flex items-center justify-center">
            <CardIcon />
          </div>
          <h1 className="text-neutral_12 font-semibold text-xl">
            Selecione o método de pagamento
          </h1>
        </div>
        <PaymentForm
          control={control}
          errors={errors}
          setPaymentMethod={setPaymentMethod}
          paymentMethod={paymentMethod}
        />
      </div>

      <Button type="submit" bgColor="black" className="mt-10">
        Finalizar compra
      </Button>
    </form>
  );
}
