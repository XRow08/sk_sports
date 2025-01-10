import { AuthModal } from "../AuthModal";
import { CartSideNav } from "../CartSideNav";
import { ReviewModal } from "../Reviews/ReviewModal";
import { SearchSideNav } from "../SearchSideNav";

export function Modals() {
  return (
    <>
      <CartSideNav />
      <SearchSideNav />
      <AuthModal />
      <ReviewModal />
    </>
  );
}
