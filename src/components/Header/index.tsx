import { LogoIcon } from "../Icons";
import { HeaderItens } from "./HeaderItens";
import { HeaderLinks } from "./HeaderLinks";

export function Header() {
  return (
    <header className="fixed top-0 w-full px-[80px] h-[68px] bg-neutral_2 flex items-center justify-between border-b border-neutral_6">
      <LogoIcon />
      <HeaderLinks />
      <HeaderItens />
    </header>
  );
}
