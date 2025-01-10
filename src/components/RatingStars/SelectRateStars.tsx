import { StarIcon } from "../Icons/StarIcon";

type Props = { setRate: (value: number) => void; rate: number };

export function SelectRateStars({ rate, setRate }: Props) {
  return (
    <div className="flex items-center gap-1">
      {[0, 1, 2, 3, 4].map((index) => (
        <button
          key={index}
          type="button"
          className="focus:outline-none"
          onClick={() => setRate(index + 1)}
          tabIndex={0}
          aria-checked={rate === index + 1}
          role="radio"
        >
          <StarIcon active={rate >= index + 1} />
        </button>
      ))}
    </div>
  );
}
