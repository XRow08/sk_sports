import { headerLinks } from "@/constants";
import Link from "next/link";

export function HeaderLinks({ isAdmin }: { isAdmin: boolean }) {
  return (
    <div className="hidden lg:flex items-center">
      {isAdmin ? (
        <>
          <Link
            href={"/admin/products"}
            className="font-medium text-neutral_11 px-4"
          >
            Lista de produtos
          </Link>
          <Link
            href={"/admin/orders"}
            className="font-medium text-neutral_11 px-4"
          >
            Transações
          </Link>

          <Link
            href={"/"}
            className="font-medium text-neutral_11 px-4"
          >
            Voltar para a home
          </Link>
        </>

      ) : (
        headerLinks.map((link) => {
          return (
            <Link
              key={link.name}
              href={link.href}
              className="font-medium text-neutral_11 px-4"
            >
              {link.name}
            </Link>
          );
        })
      )}
    </div>
  );
}
