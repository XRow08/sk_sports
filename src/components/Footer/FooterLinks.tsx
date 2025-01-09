import { headerLinks } from "@/constants";
import Link from "next/link";

export function FooterLinks() {
  return (
    <div className="flex flex-col items-center gap-4">
      <h1 className="text-xl font-bold mb-3">Atalhos</h1>
      {headerLinks.map((e) => (
        <Link key={e.name} href={e.href} target="_blank">
          {e.name}
        </Link>
      ))}
    </div>
  );
}
