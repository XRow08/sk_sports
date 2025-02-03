import { statusConfig } from "@/constants";

interface StatusProps {
  status: string;
  date: string;
  updateDate?: string;
}

export function StatusPayment({ status, date, updateDate }: StatusProps) {
  const currentStatus = statusConfig[status as keyof typeof statusConfig];
  const Icon = currentStatus.icon;

  return (
    <div className="p-6 bg-white rounded-lg shadow">
       <div className="flex items-center gap-2 mb-2">
        <Icon className={`w-5 h-5 ${currentStatus.color}`} />
        <span className={`font-bold ${currentStatus.color}`}>
          {currentStatus.message}
        </span>
      </div>
      <p className="text-gray-600">
        {updateDate && (
          <p className="text-sm text-gray-500 mt-2">
            Atualização em {updateDate}
          </p>
        )}
      </p>
    </div>
  );
}
