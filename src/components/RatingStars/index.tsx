"use client";
import { StarIcon } from "../Icons/StarIcon";

type Props = { rate: number };

export default function RatingStars({ rate }: Props) {
  return (
    <div className="flex items-center gap-1">
      {[0, 1, 2, 3, 4].map((e) => (
        <StarIcon key={e} active={rate >= e + 1} />
      ))}
    </div>
  );
}
