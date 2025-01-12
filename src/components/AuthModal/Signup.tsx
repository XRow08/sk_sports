import { Input } from "../Input";
import { Controller, useForm } from "react-hook-form";
import { Button } from "../Button";
import { yupResolver } from "@hookform/resolvers/yup";
import { signupSchema } from "@/validators";
import { useAuth } from "../Providers";

export function Signup() {
  const { onSignup } = useAuth();

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(signupSchema),
  });

  return (
    <form onSubmit={handleSubmit(onSignup)} className="flex flex-col gap-4">
      <Controller
        name="first_name"
        control={control}
        render={({ field }) => (
          <Input
            {...field}
            type="text"
            label="Primeiro nome"
            placeholder="Digite seu primeiro nome"
            errors={errors.first_name?.message}
          />
        )}
      />

      <Controller
        name="last_name"
        control={control}
        render={({ field }) => (
          <Input
            {...field}
            type="text"
            label="Seu sobrenome"
            placeholder="Digite seu sobrenome"
            errors={errors.last_name?.message}
          />
        )}
      />

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
        name="password"
        control={control}
        render={({ field }) => (
          <Input
            {...field}
            type="password"
            label="Crie uma senha"
            placeholder="Digite sua senha"
            errors={errors.password?.message}
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
            placeholder="Digite sua senha novamente"
            errors={errors.re_password?.message}
          />
        )}
      />

      <Button type="submit" className="w-full mt-4 lg:mt-11" bgColor="black">
        Criar conta
      </Button>
    </form>
  );
}
