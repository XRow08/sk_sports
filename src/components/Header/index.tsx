import { useState } from "react";
import { LogoIcon, MenuIcon } from "../Icons";
import { HeaderItens } from "./HeaderItens";
import { HeaderLinks } from "./HeaderLinks";
import { HeaderModal } from "./HeaderModal";

export function Header({ isAdmin }: { isAdmin: boolean }) {
  const [show, setShow] = useState(false);

  return (
    <header className="fixed top-0 w-full h-[68px] bg-neutral_2 flex items-center justify-center border-b border-neutral_6 z-[99999]">
      <div className="flex items-center justify-between px-4 lg:px-0 max-w-[1280px] w-full">
        <LogoIcon />
        <HeaderLinks isAdmin={isAdmin} />
        <HeaderItens isAdmin={isAdmin} />

        {!isAdmin && (
          <>
            <div className="lg:hidden pl-5" onClick={() => setShow(!show)}>
              <MenuIcon show={show} />
            </div>
            <HeaderModal show={show} onClose={() => setShow(false)} />
          </>
        )}
      </div>
    </header>
  );
}
