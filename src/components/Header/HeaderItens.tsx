import { useAuthStore, useOrderStore } from "@/store";
import { Button } from "../Button";
import { CartIcon, SearchIcon } from "../Icons";
import Link from "next/link";

export function HeaderItens({ isAdmin }: { isAdmin: boolean }) {
  const { setShowCart, showCart, setShowSearch, showSearch } = useOrderStore();
  const { setShowAuth, user } = useAuthStore();

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
          <div className="bg-neutral_12 text-neutral_4 flex items-center justify-center uppercase rounded-full h-11 w-11 cursor-pointer">
            {user.first_name.charAt(0)}
          </div>
          {user?.email === "lojask@gmail.com" && (
            <Link href={"/admin/products"}>
              <Button bgColor="black" className="ml-2">
                Entrar no admin
              </Button>
            </Link>
          )}
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
