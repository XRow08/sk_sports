import { Input } from "../Input";
import { Controller, useForm } from "react-hook-form";
import { Button } from "../Button";
import { useAuthStore } from "@/store";
import { CheckIcon } from "../Icons";
import { useState } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import { loginSchema } from "@/validators";
import { useAuth } from "../Providers";

export function Login() {
  const [remember, setRemember] = useState(false);
  const { setStepAuth } = useAuthStore();
  const { onLogin } = useAuth();

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(loginSchema),
  });

  return (
    <form onSubmit={handleSubmit(onLogin)} className="flex flex-col gap-4">
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
            errors={errors.email?.message}
          />
        )}
      />

      <Controller
        name="password"
        control={control}
        rules={{ required: "Senha é obrigatório" }}
        render={({ field }) => (
          <Input
            {...field}
            type="password"
            label="Sua senha"
            placeholder="Digite sua senha"
            errors={errors.email?.message}
          />
        )}
      />

      <div className="w-full flex items-center justify-between">
        <label
          onClick={() => setRemember(!remember)}
          className="flex items-center gap-2 cursor-pointer select-none"
        >
          <div
            className={`w-5 h-5 rounded border flex items-center justify-center ${
              remember
                ? "border-dark_neutral_8 bg-dark_neutral_5"
                : "border-neutral_6"
            } transition-all ease-in-out duration-300 `}
          >
            {remember && <CheckIcon />}
          </div>
          <p className="font-medium">Lembrar desta conta</p>
        </label>
        <p
          onClick={() => setStepAuth(1)}
          className="font-medium text-neutral_11 cursor-pointer"
        >
          Esqueci minha senha
        </p>
      </div>

      <div className="flex items-center gap-2 w-full mt-11">
        <Button
          onClick={() => setStepAuth(1)}
          type="button"
          className="w-full"
          bgColor="white-transparent"
        >
          Cadastre-se
        </Button>
        <Button type="submit" className="w-full" bgColor="black">
          Conectar
        </Button>
      </div>
    </form>
  );
}
