"use client";
import { PropsWithChildren } from "react";
import { Header } from "../Header";
import { Footer } from "../Footer";
import { Modals } from "./Modals";
import { usePathname } from "next/navigation";
import { Toaster } from "react-hot-toast";

export function Layout({ children }: PropsWithChildren) {
  const pathname = usePathname();
  const isCheckout = pathname.includes("checkout");
  const isAdmin = pathname.includes("admin");

  return (
    <section className="min-h-screen flex flex-col items-center justify-center">
      {!isCheckout && <Header isAdmin={isAdmin} />}

      <Modals />
      <section
        className={`${
          isCheckout
            ? "w-full h-full"
            : "px-4 lg:px-[80px] max-w-[1440px] pt-[92px]"
        } min-h-screen`}
      >
        <Toaster position="bottom-right" />
        {children}
      </section>
      {(!isCheckout && !isAdmin) && <Footer />}
    </section>
  );
}
