import { ArrowIcon, CloseIcon, LogoIcon, PasswordIcon } from "../Icons";

type Props = {
  step: number;
  onClose: () => void;
  setStepAuth: (e: number) => void;
};

export function HeaderAuth({ step, setStepAuth, onClose }: Props) {
  const titles: any = {
    0: "Conectar-se",
    1: "Cadastre-se",
    2: "Esqueci minha senha",
    3: "Código",
    4: "Renove sua senha",
    5: "Sua senha foi renovada!",
  };
  const title = titles[step];

  return (
    <div className="w-full mb-8">
      <div className="flex items-center justify-between w-full">
        <ArrowIcon
          rotate={180}
          onClick={() => {
            if (step === 0) return setStepAuth(0);
            setStepAuth(step - 1);
          }}
          className={`${step > 0 ? "opacity-100" : "opacity-0"}`}
        />
        <LogoIcon />
        <CloseIcon onClick={onClose} />
      </div>
      {step === 5 && <PasswordIcon />}
      <h1 className="text-[32px] font-bold w-full text-center mt-8">{title}</h1>
      {step === 3 && (
        <p className="text-neutral_11 w-full text-center">
          Para sua segurança, digite os códigos de 6 dígitos <br /> enviados para o seu
          e-mail
        </p>
      )}
    </div>
  );
}
