"use client";
import { PropsWithChildren } from "react";
import { Header } from "../Header";
import { Footer } from "../Footer";
import { Modals } from "./Modals";
import { usePathname } from "next/navigation";

export function Layout({ children }: PropsWithChildren) {
  const pathname = usePathname();
  const isCheckout = pathname.includes("checkout");

  return (
    <section className="min-h-screen flex flex-col items-center justify-center">
      {!isCheckout && <Header />}
      <Modals />
      <section
        className={`${
          isCheckout ? "w-full h-full" : "px-[80px] max-w-[1440px] pt-[92px]"
        } min-h-screen`}
      >
        {children}
      </section>
      {!isCheckout && <Footer />}
    </section>
  );
}
