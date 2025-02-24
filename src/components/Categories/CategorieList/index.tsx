import { categoriesMock } from "@/constants/mock";
import { CategorieCard } from "../CategorieCard";

export function CategorieList() {
  return (
    <div className="py-[88px]">
      <h1 className="text-[28px] font-bold pb-4">Categorias</h1>
      <div className="flex flex-wrap lg:grid lg:grid-cols-4 gap-5">
        {categoriesMock.map((item) => (
          <CategorieCard key={item.id} {...item} />
        ))}
      </div>
    </div>
  );
}
