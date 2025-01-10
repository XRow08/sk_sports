import { Input } from "../Input";
import { Controller, useForm } from "react-hook-form";
import { Button } from "../Button";
import { useAuthStore } from "@/store";
import { AuthService } from "@/services";

export function ForgotPass() {
  const { setStepAuth, setEmail } = useAuthStore();
  const { handleSubmit, control } = useForm();

  async function onSendEmail(values: any) {
    await AuthService.sendPasswordResetEmail(values.email);
    setEmail(values.email);
    setStepAuth(3);
  }

  return (
    <form onSubmit={handleSubmit(onSendEmail)} className="flex flex-col gap-4">
      <Controller
        name="email"
        control={control}
        rules={{ required: "Email é obrigatório" }}
        render={({ field }) => (
          <Input
            {...field}
            type="email"
            label="Seu email"
            placeholder="Digite seu email"
          />
        )}
      />

      <Button type="submit" className="w-full mt-11" bgColor="black">
        Próximo
      </Button>
    </form>
  );
}
