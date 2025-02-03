import { useAuthStore, useOrderStore } from "@/store";
import { Button } from "../Button";
import { CartIcon, SearchIcon } from "../Icons";
import Link from "next/link";
import { useState } from "react";
import { useAuth } from "../Providers";

export function HeaderItens({ isAdmin }: { isAdmin: boolean }) {
  const { setShowCart, showCart, setShowSearch, showSearch } = useOrderStore();
  const { setShowAuth, user } = useAuthStore();
  const { onLogout } = useAuth();
  const [showDropdown, setShowDropdown] = useState(false);

  return (
    <div className="hidden lg:flex items-center space-x-2">
      <SearchIcon
        onClick={() => {
          setShowSearch(!showSearch);
          setShowCart(false);
        }}
      />
      <CartIcon
        onClick={() => {
          setShowCart(!showCart);
          setShowSearch(false);
        }}
      />
      {user ? (
        <>
          <div className="relative">
            <div
              className="bg-neutral_12 text-neutral_4 flex items-center justify-center uppercase rounded-full h-11 w-11 cursor-pointer"
              onClick={() => setShowDropdown(!showDropdown)}
            >
              {user.first_name.charAt(0)}
            </div>

            {showDropdown && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10">
                <Link
                  href="/orders"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  Minhas compras
                </Link>
                <button
                  onClick={onLogout}
                  className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  Sair
                </button>
              </div>
            )}
          </div>
        </>
      ) : (
        <Button
          onClick={() => setShowAuth(true)}
          bgColor="black"
          className="ml-2"
        >
          Entrar na plataforma
        </Button>
      )}
    </div>
  );
}
