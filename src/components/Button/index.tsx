import classNames from "classnames";

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  size?: string;
  bgColor?: "black" | "white" | "white-transparent";
}

export function Button({
  size = "normal",
  bgColor,
  className,
  ...rest
}: Props) {
  return (
    <button
      {...rest}
      className={classNames(
        `rounded-lg transition duration-300 ease-in-out flex items-center justify-center gap-2 select-none`,
        {
          "bg-dark_neutral_2 hover:bg-dark_neutral_8 text-dark_neutral_12":
            !bgColor || bgColor === "black",
        },
        {
          "bg-transparent hover:bg-neutral_5 border border-neutral_6 hover:border-neutral_8 text-neutral_11 hover:text-neutral_12":
            bgColor === "white-transparent",
        },
        {
          "bg-neutral_6 hover:bg-neutral_5 border border-neutral_6 hover:border-neutral_8 text-neutral_12":
            bgColor === "white",
        },
        {
          "px-4 py-3 font-medium": size === "normal",
        },
        {
          "px-6 py-3 text-xl font-semibold": size === "big",
        },
        className
      )}
    >
      {rest.children}
    </button>
  );
}
