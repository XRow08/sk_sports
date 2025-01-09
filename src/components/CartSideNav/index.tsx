import { useOrderStore } from "@/store";
import { CloseIcon, NoCartIcon } from "../Icons";
import { CartList } from "./CartList";
import { Button } from "../Button";
import Link from "next/link";

export function CartSideNav() {
  const { showCart, setShowCart, items } = useOrderStore();

  return (
    <div
      className={`${
        !showCart ? "translate-x-full" : ""
      } transition-all duration-300 ease-in-out fixed top-[68px] pb-[88px] flex flex-col justify-between z-50 right-0 py-6 w-[622px] min-h-[calc(100vh-68px)] bg-neutral_2 border-l border-neutral_6`}
    >
      <div className="flex flex-col justify-between h-full overflow-y-auto">
        <div className="flex items-center w-full justify-between px-4">
          <h1 className="text-xl font-bold mb-3 select-none">
            Carrinho de compras
          </h1>
          <CloseIcon onClick={() => setShowCart(false)} />
        </div>

        {items.length > 0 ? (
          <CartList items={items} />
        ) : (
          <div className="w-full flex items-center justify-center">
            <div className="flex flex-col items-center justify-center mt-[88px]">
              <NoCartIcon />
              <h1 className="text-2xl font-semibold mt-8">
                Seu carrinho está vazio
              </h1>
              <Link href={"/products"} className="mt-[88px]">
                <Button bgColor="black">Visualizar todos os produtos</Button>
              </Link>
            </div>
          </div>
        )}
      </div>

      <div className="flex items-center justify-center w-full mt-6">
        <Button bgColor="black" className="w-1/2">
          Finalizar carrinho
        </Button>
      </div>
    </div>
  );
}
