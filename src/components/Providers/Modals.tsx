import { AuthModal } from "../AuthModal";
import { CartSideNav } from "../CartSideNav";
import { SearchSideNav } from "../SearchSideNav";

export function Modals() {
  return (
    <>
      <CartSideNav />
      <SearchSideNav />
      <AuthModal />
    </>
  );
}
