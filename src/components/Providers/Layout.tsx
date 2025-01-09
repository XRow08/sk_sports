import { PropsWithChildren } from "react";
import { Header } from "../Header";
import { Footer } from "../Footer";
import { Modals } from "./Modals";

export function Layout({ children }: PropsWithChildren) {
  return (
    <section className="min-h-screen flex flex-col items-center justify-center pt-[92px]">
      <Header />
      <Modals />
      <section className="px-[80px] max-w-[1440px] min-h-screen">
        {children}
      </section>
      <Footer />
    </section>
  );
}
