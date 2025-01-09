import { FooterDepartments } from "./FooterDepartments";
import { FooterLinks } from "./FooterLinks";
import { FooterSocials } from "./FooterSocials";
import { LogoIcon, SquareIcon, WhatsAppIcon } from "../Icons";
import { Button } from "../Button";
import Link from "next/link";

export function Footer() {
  return (
    <footer className="w-full mt-[88px] p-20 min-h-[407px] h-[407px] bg-neutral_3 border-t border-neutral_6 flex items-start justify-between">
      <FooterDepartments />
      <FooterLinks />
      <div className="h-full flex flex-col justify-between items-center">
        <FooterSocials />
        <Link href={"/"}>
          <LogoIcon size={132} />
        </Link>
      </div>
      <div className="w-[567px] h-[247px] bg-[url(/images/banners/asksCard.png)] bg-cover rounded-xl p-8 flex flex-col justify-between">
        <h1 className="text-xl text-dark_neutral_12 font-bold">
          Ficou com alguma dúvida? Entre contato conosco
        </h1>
        <div>
          <Button bgColor="white" size="big">
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
