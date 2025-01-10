import { Controller } from "react-hook-form";
import { Input } from "../Input";
import InputMask from "react-input-mask";

export function ContactForm({ control, errors }: any) {
  return (
    <div className="flex flex-col gap-2 w-full">
      <Controller
        name="email"
        control={control}
        render={({ field }) => (
          <Input
            {...field}
            type="email"
            label="Seu email"
            placeholder="Digite seu email"
            errors={errors.email?.message}
          />
        )}
      />

      <Controller
        name="name_complete"
        control={control}
        render={({ field }) => (
          <Input
            {...field}
            type="text"
            label="Nome completo"
            placeholder="Digite seu nome completo"
            errors={errors.name_complete?.message}
          />
        )}
      />
      <div className="flex items-center gap-4 w-full">
        <Controller
          name="cellphone"
          control={control}
          render={({ field }) => (
            <InputMask mask="(99) 99999-9999" {...field}>
              {(inputProps) => (
                <Input
                  {...inputProps}
                  type="text"
                  label="Celular"
                  placeholder="(99) 99999-9999"
                  errors={errors.cellphone?.message}
                />
              )}
            </InputMask>
          )}
        />
        <Controller
          name="cpf"
          control={control}
          render={({ field }) => (
            <InputMask mask="999.999.999-99" {...field}>
              {(inputProps) => (
                <Input
                  {...inputProps}
                  type="text"
                  label="CPF"
                  placeholder="Digite seu CPF"
                  errors={errors.cpf?.message}
                />
              )}
            </InputMask>
          )}
        />
      </div>
    </div>
  );
}
