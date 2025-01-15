import { useOrderStore } from "@/store";
import Image from "next/image";
import { Button } from "../Button";
import { useEffect, useState } from "react";

export function PixPayment() {
  const { pixResponse } = useOrderStore();
  const [timeLeft, setTimeLeft] = useState<string>("1:00:00");
  const [copied, setCopied] = useState(false);

  const handleCopyPix = async () => {
    try {
      if (!pixResponse) return;
      await navigator.clipboard.writeText(pixResponse.data.pix_emv);
      setCopied(true);
      setTimeout(() => {
        setCopied(false);
      }, 3000);
    } catch (err) {
      console.error("Falha ao copiar:", err);
    }
  };

  useEffect(() => {
    const calculateTimeLeft = () => {
      if (!pixResponse) return;
      const expirationDate = new Date(pixResponse.data.pix_expiration_date);
      const now = new Date();
      const difference = expirationDate.getTime() - now.getTime();
      if (difference <= 0) return setTimeLeft("00:00:00");
      const hours = Math.floor(difference / (1000 * 60 * 60));
      const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((difference % (1000 * 60)) / 1000);
      const formattedTime = `${hours.toString().padStart(2, "0")}:${minutes
        .toString()
        .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
      setTimeLeft(formattedTime);
    };
    const timer = setInterval(calculateTimeLeft, 1000);
    return () => clearInterval(timer);
  }, [pixResponse]);

  return (
    <div className="flex flex-col items-center justify-center text-neutral_12">
      <div className="flex flex-col items-center justify-center gap-4">
        <h1 className="font-semibold text-xl">PIX gerado com sucesso</h1>
        <p className="text-center w-full">
          Estamos aguardando o pagamento! Após realizar o pagamento, aguarde
          nesta tela para confirmar seu pedido
        </p>
      </div>

      <div className="flex flex-col items-center justify-center gap-4 border-t border-b border-neutral_6 py-8 my-8 w-full">
        <h1 className="font-extrabold text-[#228E2D] text-[40px]">
          {timeLeft}
        </h1>
        <p className="text-center w-full">Tempo para conclusão do pagamento</p>
        <p className="text-center w-full">
          Efetue o pagamento lendo o <span className="font-bold">QR CODE</span>
        </p>
      </div>

      <div className="flex flex-col items-center justify-center gap-4">
        <Image
          src={`data:image/png;base64,${pixResponse?.data.pix_qrcode}`}
          alt="PIX QR Code"
          width={100000}
          height={100000}
          className="w-[326px] h-[326px] object-cover"
        />
        <Button onClick={handleCopyPix} bgColor="black">
          {copied ? "PIX Copiado!" : "Copiar PIX copia e cola"}
        </Button>
      </div>
    </div>
  );
}
