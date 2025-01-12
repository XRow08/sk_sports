import { Input } from "../Input";
import { Controller, useForm } from "react-hook-form";
import { Button } from "../Button";
import { useAuthStore } from "@/store";
import { UserService } from "@/services";

export function ResetPass() {
  const { setStepAuth, email } = useAuthStore();
  const { handleSubmit, control } = useForm();

  async function onResetPass(values: any) {
    await UserService.resetPassword({ email, newPassword: values.password });
    setStepAuth(0);
  }

  return (
    <form onSubmit={handleSubmit(onResetPass)} className="flex flex-col gap-4">
      <Controller
        name="password"
        control={control}
        render={({ field }) => (
          <Input
            {...field}
            type="password"
            label="Crie uma senha"
            placeholder="Crie uma senha"
          />
        )}
      />

      <Controller
        name="re_password"
        control={control}
        render={({ field }) => (
          <Input
            {...field}
            type="password"
            label="Sua senha novamente"
            placeholder="Sua senha novamente"
          />
        )}
      />

      <Button type="submit" className="w-full mt-4 lg:mt-11" bgColor="black">
        Próximo
      </Button>
    </form>
  );
}
