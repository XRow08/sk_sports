import { departments } from "@/constants";
import Link from "next/link";

export function FooterDepartments() {
  return (
    <div className="flex flex-col items-center gap-4">
      <h1 className="text-lg lg:text-xl font-bold lg:mb-3">Departamentos</h1>
      {departments.map((e) => (
        <Link
          key={e.name}
          href={e.href}
          target="_blank"
          className="text-sm lg:text-base text-center"
        >
          {e.name}
        </Link>
      ))}
    </div>
  );
}
