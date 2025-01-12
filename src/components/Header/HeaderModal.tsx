import { headerLinks } from "@/constants";
import Link from "next/link";
import { Button } from "../Button";
import { SearchIcon, CartIcon } from "../Icons";
import { useOrderStore, useAuthStore } from "@/store";

type Props = { show: boolean; onClose: () => void };

export function HeaderModal({ show, onClose }: Props) {
  const { setShowCart, showCart, setShowSearch, showSearch } = useOrderStore();
  const { setShowAuth, user } = useAuthStore();

  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div
      onClick={handleOverlayClick}
      className={`lg:hidden ${
        show ? "" : "translate-x-full"
      } transition-all duration-300 ease-in-out flex flex-col items-start fixed top-[68px] h-screen w-screen left-0 z-50`}
    >
      <div className="flex flex-col w-full gap-[18px] p-5 bg-neutral_3 border-b border-white/30">
        {headerLinks.map((link) => {
          return (
            <Link
              onClick={onClose}
              key={link.name}
              href={link.href}
              className={`font-medium text-neutral_11 px-4`}
            >
              {link.name}
            </Link>
          );
        })}
        <div className="w-full h-[1px] bg-white/5" />
        <div className="flex items-center justify-between space-x-2">
          <div className="flex items-center gap-4">
            <SearchIcon
              onClick={() => {
                setShowSearch(!showSearch);
                setShowCart(false);
                onClose();
              }}
            />
            <CartIcon
              onClick={() => {
                setShowCart(!showCart);
                setShowSearch(false);
                onClose();
              }}
            />
          </div>
          {user ? (
            <div className="bg-neutral_12 text-neutral_4 flex items-center justify-center uppercase rounded-full h-11 w-11 cursor-pointer">
              {user.first_name.charAt(0)}
            </div>
          ) : (
            <Button
              onClick={() => {
                setShowAuth(true);
                onClose();
              }}
              bgColor="black"
              className="ml-2"
            >
              Entrar na plataforma
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
