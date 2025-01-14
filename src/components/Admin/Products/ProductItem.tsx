import { DeleteIcon, EditIcon } from "@/components/Icons";
import { FormatNumber } from "@/helpers";
import { IProduct } from "@/interfaces";
import { ProductService } from "@/services";
import Image from "next/image";
import Link from "next/link";
import toast from "react-hot-toast";

export function ProductItem({ item }: { item: IProduct }) {
  const { formatToBRL, applyDiscount } = FormatNumber;
  const discountValue = applyDiscount(item.price, item.discount);

  async function onDelete() {
    try {
      await ProductService.deleteById(item.id);
      toast.success("Produto deletado com sucesso!");
    } catch (error) {
      toast.error("Erro ao deletar produto, tente novamente.");
      console.error(error)
    }
  }

  return (
    <div className="flex items-center justify-between w-full border-b border-neutral_6 py-3 px-4">
      <div className="min-w-[350px] w-[350px] flex items-center">
        {item.image_url && (
          <Image
            src={item.image_url}
            alt={item.name}
            height={10000}
            width={10000}
            className="w-[64px] h-[64px] lg:h-[64px] lg:min-h-[64px] rounded-2xl object-cover"
          />
        )}
        <p className="text-sm lg:text-base text-start w-full">{item.name}</p>
      </div>

      <div className="min-w-[290px] w-[290px] text-center">
        <p className="font-extrabold text-sm lg:text-base">
          {formatToBRL(item.price)}
        </p>
        <p className="font-medium text-xs lg:text-base text-neutral_11 line-through">
          {formatToBRL(discountValue)}
        </p>
      </div>

      <div className="w-full grid grid-cols-4 uppercase text-center font-medium">
        {item.size.map((e) => (
          <h1 key={e}>{e}</h1>
        ))}
      </div>

      <div className="min-w-[290px] w-[290px] text-center">
        <p className="font-extrabold text-sm lg:text-base">0</p>
        <p className="font-medium text-xs lg:text-base text-neutral_11">
          Vendidos
        </p>
      </div>

      <div className="w-full flex items-center justify-end gap-1">
        <Link
          href={`/admin/products/${item.slug}`}
          className="rounded border border-[#9DDDE7] p-1 cursor-pointer"
        >
          <EditIcon />
        </Link>

        <div
          onClick={onDelete}
          className="rounded border border-[#FDBDBE] p-1 cursor-pointer"
        >
          <DeleteIcon />
        </div>
      </div>
    </div>
  );
}
