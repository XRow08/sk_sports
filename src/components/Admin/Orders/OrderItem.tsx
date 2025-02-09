import { DeleteIcon, EditIcon } from "@/components/Icons";
import { statusConfig } from "@/constants";
import { FormatNumber } from "@/helpers";
import { IOrder } from "@/interfaces";
import { OrderService } from "@/services";
import Link from "next/link";
import toast from "react-hot-toast";

export default function OrderItemAdmin({ item }: { item: IOrder }) {
  const { formatToBRL } = FormatNumber;

  async function onDelete() {
    try {
      await OrderService.deleteById(item.id);
      toast.success("Produto deletado com sucesso!");
    } catch (error) {
      toast.error("Erro ao deletar produto, tente novamente.");
      console.error(error);
    }
  }

  const currentStatus = statusConfig[item.status as keyof typeof statusConfig];

  return (
    <div className="flex items-center justify-between w-full border-b border-neutral_6 py-3 px-4">
      <div className="min-w-[160px] w-[160px]">{item.user?.first_name}</div>

      <div className="text-center min-w-[290px] w-[290px]">
        {item.user?.email}
      </div>

      <div className="text-center min-w-[156px] w-[156px]">
        {new Date(item.updatedAt).toLocaleDateString()}
      </div>

      <div className="text-center min-w-[156px] w-[156px]">
        {formatToBRL(item.total_price)}
      </div>

      <div className="w-full text-center flex items-center justify-center">
        <span className={`font-bold ${currentStatus?.color}`}>
          {currentStatus?.message}
        </span>
      </div>

      <div className="min-w-[112px] w-[112px] flex items-center justify-end gap-1">
        <Link
          href={`/admin/orders/${item.id}`}
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
