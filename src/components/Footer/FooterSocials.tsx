import { socialLinks } from "@/constants";
import Link from "next/link";

export function FooterSocials() {
  return (
    <div className="flex flex-col items-center w-full lg:w-auto">
      <h1 className="text-xl font-bold mb-3">Redes sociais</h1>
      <div className="flex items-center gap-3 w-full lg:w-auto justify-between">
        {socialLinks.map((e, i) => (
          <Link key={i} href={e.href} target="_blank">
            {e.icon()}
          </Link>
        ))}
      </div>
    </div>
  );
}
