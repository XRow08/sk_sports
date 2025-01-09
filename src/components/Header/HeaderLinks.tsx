import { headerLinks } from "@/constants";

export function HeaderLinks() {
  return (
    <div className="flex items-center">
      {headerLinks.map((link) => {
        return (
          <a key={link.name} href={link.href} className="font-medium text-neutral_11 px-4">
            {link.name}
          </a>
        );
      })}
    </div>
  );
}