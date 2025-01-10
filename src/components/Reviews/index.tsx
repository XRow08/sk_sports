"use client";
import { IProduct, IProductRate } from "@/interfaces";
import { Button } from "../Button";
import { StarIcon } from "../Icons/StarIcon";
import RatingStars from "../RatingStars";
import { ReviewItem } from "./ReviewItem";
import { useAuthStore, useOrderStore } from "@/store";

type Props = { rates: IProductRate[]; product: IProduct };

export function Reviews({ rates, product }: Props) {
  const { setShowReview, setProductToReview } = useOrderStore();
  const { user, setStepAuth, setShowAuth } = useAuthStore();
  const rateTotal = rates.reduce((acc, rate) => acc + Number(rate.rate), 0);
  const rate = isNaN(rateTotal / rates.length) ? 0 : rateTotal / rates.length;
  const filteredRates = [...rates].sort((a, b) => {
    const dateA = new Date(a.createdAt).getTime();
    const dateB = new Date(b.createdAt).getTime();
    return dateB - dateA;
  });

  async function onShowModal() {
    if (!user) {
      setShowAuth(true);
      setStepAuth(0);
    } else {
      setProductToReview(product);
      setShowReview(true);
    }
  }

  const totalRates = rates.length;
  const rateCounts = Array.from({ length: 5 }).map((_, i) => {
    const count = rates.filter((r) => r.rate === i + 1).length;
    const percentage = totalRates > 0 ? (count / totalRates) * 100 : 0;
    return { count, percentage };
  });

  return (
    <div className="mt-[88px] w-full">
      <h1 className="text-[28px] font-bold">Avaliações sobre o produto</h1>
      <div className="flex w-full items-start justify-between">
        <div className="flex flex-col min-w-[295px]">
          <div className="w-full flex items-center justify-between">
            <h1 className="text-[60px] font-extrabold">{rate.toFixed(1)}</h1>
            <div>
              <RatingStars rate={rate} />
              <p className="font-normal text-neutral_11">
                {rates.length} avaliações
              </p>
            </div>
          </div>
          <div className="w-full flex flex-col-reverse gap-2 mb-8">
            {rateCounts.map(({ percentage }, i) => (
              <div key={i} className="flex items-center gap-[10px]">
                <div className="w-full bg-neutral_5 rounded-full h-[9px]">
                  <div
                    style={{ width: `${percentage}%` }}
                    className="h-[9px] bg-neutral_11 rounded-full"
                  />
                </div>
                <div className="flex items-center justify-end gap-1 text-neutral_11 text-center">
                  <h1 className="text-center w-2">{i + 1}</h1>{" "}
                  <StarIcon size={16} active={false} />
                </div>
              </div>
            ))}
          </div>
          <Button onClick={onShowModal} bgColor="black">
            Escrever avaliação
          </Button>
        </div>

        <div className="min-w-[870px] w-[870px] flex flex-col gap-3">
          {filteredRates.map((e, i) => (
            <ReviewItem item={e} key={i} />
          ))}
        </div>
      </div>
    </div>
  );
}
