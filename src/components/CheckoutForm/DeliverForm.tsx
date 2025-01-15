import { Controller } from "react-hook-form";
import { Input } from "../Input";
import { UserService } from "@/services";
import { useState } from "react";
import InputMask from "react-input-mask";

export function DeliverForm({ control, errors, setValue }: any) {
  const [isCep, setIsCep] = useState(false);

  async function onHandleCep(cep: string) {
    try {
      setValue("cep", cep);
      const cepInfo = await UserService.findCep(cep);
      if (!cepInfo) return setIsCep(false);
      setIsCep(true);
      setValue("address", cepInfo.logradouro);
      setValue("district", cepInfo.bairro);
    } catch (error) {
      setIsCep(false);
    }
  }

  return (
    <div className="flex flex-col gap-2 w-full">
      <div className="w-full flex items-center gap-4">
        <Controller
          name="cep"
          control={control}
          render={({ field }) => (
            <InputMask
              mask="99999-999"
              {...field}
              onChange={({ target }) => onHandleCep(target.value)}
            >
              {(inputProps) => (
                <Input
                  {...inputProps}
                  type="text"
                  label="CEP"
                  placeholder="00000-000"
                  errors={errors.cep?.message}
                />
              )}
            </InputMask>
          )}
        />
        <h1 className="w-full text-lg font-medium text-neutral_11 self-end">
          Para visualizar o frete, preencha o campo CEP
        </h1>
      </div>

      <div
        className={`flex flex-col gap-2 w-full transition-all duration-300 ease-in-out ${
          isCep ? "opacity-100 h-full" : " opacity-0 h-0 z-[-1]"
        }`}
      >
        <div className="flex items-center gap-4 w-full">
          <div className="w-3/4">
            <Controller
              name="address"
              control={control}
              render={({ field }) => (
                <Input
                  {...field}
                  type="text"
                  label="Endereço"
                  placeholder="Digite seu endereço"
                  errors={errors.address?.message}
                />
              )}
            />
          </div>
          <div className="w-1/3">
            <Controller
              name="number"
              control={control}
              render={({ field }) => (
                <Input
                  {...field}
                  type="text"
                  label="Número"
                  placeholder="Número do endereço"
                  errors={errors.number?.message}
                />
              )}
            />
          </div>
        </div>

        <div className="flex items-center gap-4 w-full">
          <div className="w-3/4">
            <Controller
              name="district"
              control={control}
              render={({ field }) => (
                <Input
                  {...field}
                  type="text"
                  label="Bairro"
                  placeholder="Nome do seu bairro"
                  errors={errors.district?.message}
                />
              )}
            />
          </div>
          <div className="w-1/3">
            <Controller
              name="complement"
              control={control}
              render={({ field }) => (
                <Input
                  {...field}
                  type="text"
                  label="Complemento"
                  placeholder="Complemento"
                  errors={errors.complement?.message}
                />
              )}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
