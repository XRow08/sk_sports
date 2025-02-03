const SIZES_TABLE = [
  { size: 'P', length: '42-71cm', width: '42-71cm', height: '42-71cm' },
  { size: 'PP', length: '42-71cm', width: '42-71cm', height: '42-71cm' },
  { size: 'M', length: '42-71cm', width: '42-71cm', height: '42-71cm' },
  { size: 'G', length: '42-71cm', width: '42-71cm', height: '42-71cm' },
  { size: 'GG', length: '42-71cm', width: '42-71cm', height: '42-71cm' },
  { size: 'G1', length: '42-71cm', width: '42-71cm', height: '42-71cm' },
  { size: 'G2', length: '42-71cm', width: '42-71cm', height: '42-71cm' },
  { size: 'G3', length: '42-71cm', width: '42-71cm', height: '42-71cm' },
];

export function SizesTable() {
  return (
    <div className="flex flex-col gap-4">
      <p className="text-sm text-gray-600">
        As medidas são dimensões aproximadas, apenas para servir de parâmetro para nossos clientes. Na dúvida, recomendamos que escolha 1 número acima
      </p>
      
      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-100">
              <th className="border p-2 text-left">Tamanho</th>
              <th className="border p-2 text-left">Comprimento</th>
              <th className="border p-2 text-left">Largura</th>
              <th className="border p-2 text-left">Altura</th>
            </tr>
          </thead>
          <tbody>
            {SIZES_TABLE.map((size) => (
              <tr key={size.size}>
                <td className="border p-2">{size.size}</td>
                <td className="border p-2">{size.length}</td>
                <td className="border p-2">{size.width}</td>
                <td className="border p-2">{size.height}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}