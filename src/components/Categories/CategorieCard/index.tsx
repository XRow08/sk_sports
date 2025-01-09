export function CategorieCard(item: any) {
  return (
    <div className="bg-[url(/images/banners/categorie.png)] bg-cover px-20 w-[305px] h-[140px] flex items-center justify-center rounded-2xl">
      <h1 className="text-dark_neutral_12 text-[28px] font-bold text-center">{item.name}</h1>
    </div>
  );
}