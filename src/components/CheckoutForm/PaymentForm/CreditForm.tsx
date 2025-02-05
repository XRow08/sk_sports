import { Input } from "@/components/Input";
import { Controller } from "react-hook-form";
import InputMask from "react-input-mask";

export function CreditForm({ control, errors, isCredit }: any) {
  return (
    <div
      className={`flex flex-col gap-2 w-full transition-all duration-300 ease-in-out ${
        isCredit ? "opacity-100 h-full mb-4" : " opacity-0 h-0"
      }`}
    >
      <Controller
        name="card_number"
        control={control}
        render={({ field }) => (
          <InputMask mask="9999 9999 9999 9999" {...field}>
            {(inputProps) => (
              <Input
                {...inputProps}
                type="text"
                label="Número do cartão"
                placeholder="Digite os dígitos do seu cartão"
                errors={errors.card_number?.message}
              />
            )}
          </InputMask>
        )}
      />

      <Controller
        name="card_name"
        control={control}
        render={({ field }) => (
          <Input
            {...field}
            type="text"
            label="Nome impresso no cartão"
            placeholder="Digite o nome impresso no cartão"
            errors={errors.card_name?.message}
          />
        )}
      />

      <div className="flex items-center gap-4">
        <Controller
          name="valid_at"
          control={control}
          render={({ field }) => (
            <InputMask mask="99/99" {...field}>
              {(inputProps) => (
                <Input
                  {...inputProps}
                  type="text"
                  label="Data de validade"
                  placeholder="MM/AA"
                  errors={errors.valid_at?.message}
              />
            )}
          </InputMask>
            
          )}
        />
        <Controller
          name="cvv"
          control={control}
          render={({ field }) => (
            <Input
              {...field}
              type="text"
              label="CVV"
              maxLength={3}
              placeholder="Digite os 3 dígitos do seu cartão"
              errors={errors.cvv?.message}
            />
          )}
        />
      </div>

      <Input
        label="Parcelas"
        disabled={true}
        onClick={() => console.log("clicado")}
        placeholder="Selecione o número de parcelas"
        errors={errors.installments?.message}
      />
    </div>
  );
}
