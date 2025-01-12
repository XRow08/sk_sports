import { FooterDepartments } from "./FooterDepartments";
import { FooterLinks } from "./FooterLinks";
import { FooterSocials } from "./FooterSocials";
import { LogoIcon, SquareIcon, WhatsAppIcon } from "../Icons";
import { Button } from "../Button";
import Link from "next/link";

export function Footer() {
  return (
    <footer className="w-full mt-[88px] px-4 py-16 lg:p-20 min-h-[407px] lg:h-[407px] bg-neutral_3 border-t border-neutral_6 flex flex-col lg:flex-row items-start justify-between  ">
      <div className="flex flex-row items-start lg:gap-20 w-full lg:w-auto justify-between">
        <FooterDepartments />
        <FooterLinks />
      </div>
      <div className="h-full flex flex-row lg:flex-col gap-10 w-full lg:w-auto justify-between items-center">
        <FooterSocials />
        <Link href={"/"}>
          <LogoIcon size={132} />
        </Link>
      </div>
      <div className="w-[567px] max-w-full lg:max-w-none mt-24 lg:mt-0 lg:h-[247px] bg-[url(/images/banners/asksCard.png)] bg-cover rounded-xl p-8 gap-10 flex flex-col justify-between">
        <h1 className="text-xl text-dark_neutral_12 font-bold w-[280px] lg:w-auto">
          Ficou com alguma dúvida? Entre contato conosco
        </h1>
        <div>
          <Button bgColor="white" size="big" className="w-full">
            <WhatsAppIcon /> Chamar no whatsapp
          </Button>
          <div className="flex items-center w-full relative h-[34px] mt-3">
            <div className="w-full h-2 bg-gradient-to-l from-[#F9F9FB00]/100 to-[#F9F9FB00]" />
            <div className="bg-dark_neutral_12 rounded-full p-2 absolute top-0 right-0">
              <SquareIcon />
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
