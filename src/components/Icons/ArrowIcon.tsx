export function ArrowIcon({
  size = 24,
  rotate = 0,
  onClick,
  className,
}: {
  size?: number;
  rotate?: number;
  onClick?: () => void;
  className?: string;
}) {
  return (
    <svg
      width={size}
      height={size}
      onClick={onClick}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ rotate: `${rotate}deg` }}
      className={`${className} transition-all duration-300 ease-in-out cursor-pointer`}
    >
      <path
        d="M10 7L14 12L10 17"
        stroke="#1C2024"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
