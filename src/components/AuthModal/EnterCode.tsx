import { Input } from "../Input";
import { Controller, useForm } from "react-hook-form";
import { Button } from "../Button";
import { useAuthStore } from "@/store";
import { UserService } from "@/services";

export function EnterCode() {
  const { setStepAuth, email } = useAuthStore();
  const { handleSubmit, control } = useForm();

  async function onValidate(values: any) {
    await UserService.validateCode({ email, code: values.code});
    setStepAuth(4);
  }

  return (
    <form onSubmit={handleSubmit(onValidate)} className="flex flex-col gap-4">
      <Controller
        name="code"
        control={control}
        render={({ field }) => (
          <Input
            {...field}
            type="text"
            label="Código"
            placeholder="Digite o código de 6 dígitos"
          />
        )}
      />

      <div className="w-full flex items-center justify-between">
        <p
          onClick={() => setStepAuth(3)}
          className="font-medium text-neutral_11 cursor-pointer"
        >
          Reenviar código
        </p>
      </div>

      <Button type="submit" className="w-full mt-4 lg:mt-11" bgColor="black">
        Próximo
      </Button>
    </form>
  );
}
