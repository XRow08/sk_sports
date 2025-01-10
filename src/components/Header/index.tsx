import { LogoIcon } from "../Icons";
import { HeaderItens } from "./HeaderItens";
import { HeaderLinks } from "./HeaderLinks";

export function Header() {
  return (
    <header className="fixed top-0 w-full h-[68px] bg-neutral_2 flex items-center justify-center border-b border-neutral_6">
      <div className="flex items-center justify-between max-w-[1280px] w-full">
        <LogoIcon />
        <HeaderLinks />
        <HeaderItens />
      </div>
    </header>
  );
}
