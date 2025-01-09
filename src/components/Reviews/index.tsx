import { Button } from "../Button";
import { StarIcon } from "../Icons/StarIcon";
import RatingStars from "../RatingStars";
import { ReviewItem } from "./ReviewItem";

export function Reviews({ rate }: { rate: number }) {
  const percentege = rate * 10;

  return (
    <div className="mt-[88px] w-full">
      <h1 className="text-[28px] font-bold">Avaliações sobre o produto</h1>
      <div className="flex w-full items-start justify-between">
        <div className="flex flex-col min-w-[295px]">
          <div className="w-full flex items-center justify-between">
            <h1 className="text-[60px] font-extrabold">{rate.toFixed(1)}</h1>
            <div>
              <RatingStars rate={rate} />
              <p className="font-normal text-neutral_11">33 avaliações</p>
            </div>
          </div>
          <div className="w-full flex flex-col-reverse gap-2 mb-8">
            {Array.from({ length: 5 }).map((e, i) => (
              <div key={i} className="flex items-center gap-[10px]">
                <div className="w-full bg-neutral_5 rounded-full h-[9px]">
                  <div
                    style={{ width: `${percentege}%` }}
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
          <Button bgColor="black">Escrever avaliação</Button>
        </div>

        <div className="min-w-[870px] w-[870px] flex flex-col gap-3">
          {Array.from({ length: 4 }).map((e, i) => (
            <ReviewItem item={e} key={i} />
          ))}
        </div>
      </div>
    </div>
  );
}
