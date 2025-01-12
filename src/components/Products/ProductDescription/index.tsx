import { IProduct } from "@/interfaces";

export function ProductDescription(product: IProduct) {
  const descriptions = [
    { name: "Tecnologia:", description: product.tech },
    { name: "Gênero:", description: product.gender },
    { name: "Cor predominante:", description: product.cor },
    { name: "Manga:", description: product.sleeve },
    { name: "Composição:", description: product.composition },
    { name: "Clube/Seleção:", description: product.club },
    { name: "Indicada para:", description: product.indicate_for },
    { name: "Gola:", description: product.collar },
  ];
  return (
    <div className="my-[88px] flex flex-col gap-6 w-full">
      <h1 className="text-[28px] font-bold">Descrição do produto</h1>
      <p>{product.description}</p>

      <div className="grid grid-cols-1 lg:grid-cols-2 border-t border-l border-neutral_6 overflow-hidden">
        {descriptions.map((e) => (
          <div
            key={e.name}
            className="p-5 flex items-center justify-between w-full border-r border-b border-neutral_6"
          >
            <h1 className="font-medium">{e.name}</h1>
            <h1 className="font-semibold text-lg">{e.description}</h1>
          </div>
        ))}
      </div>
    </div>
  );
}
