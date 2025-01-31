"use client";

import { Button } from "@/components/Button";
import Link from "next/link";

export default function Checkout() {
  return (
    <section className="flex flex-col w-full min-h-screen h-full">
      <header className="h-[64px] w-full fixed top-0 left-0 z-10 bg-dark_neutral_1 flex items-center justify-center border-b border-dark_neutral_6">
        <h1 className="text-dark_neutral_12 font-extrabold text-2xl">
          Pagamento - Sucesso
        </h1>
      </header>
      <section className="flex items-center justify-center min-h-screen h-full text-dark_neutral_12 relative">
        <div className="pt-[64px] w-1/2 pb-[88px] flex flex-col items-center justify-center gap-6">
          <svg
            width="104"
            height="104"
            viewBox="0 0 104 104"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              opacity="0.4"
              d="M103.667 52.0006C103.667 80.5354 80.5346 103.667 51.9999 103.667C23.4652 103.667 0.333252 80.5354 0.333252 52.0006C0.333252 23.4659 23.4652 0.333984 51.9999 0.333984C80.5346 0.333984 103.667 23.4659 103.667 52.0006Z"
              fill="#1C2024"
            />
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M75.0456 33.4414C76.7349 34.7553 77.0393 37.1899 75.7254 38.8792L55.0225 65.4971C51.8 69.6404 45.7384 70.1781 41.8369 66.6667L28.741 54.8804C27.1503 53.4488 27.0214 50.9987 28.453 49.4079C29.8847 47.8172 32.3348 47.6883 33.9255 49.1199L47.0214 60.9062C47.5787 61.4078 48.4447 61.331 48.905 60.7391L69.6079 34.1212C70.9218 32.4319 73.3563 32.1275 75.0456 33.4414Z"
              fill="#1C2024"
            />
          </svg>

          <h1 className="text-black font-extrabold text-2xl">
            Pagamento concluído com sucesso
          </h1>

          <Link href="/">
            <Button bgColor="black">Voltar para a home</Button>
          </Link>
        </div>
      </section>
    </section>
  );
}
