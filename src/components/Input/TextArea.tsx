import { forwardRef } from "react";

interface Props extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  errors?: string;
  label?: string;
  theme?: string;
}

export const TextArea = forwardRef<HTMLTextAreaElement, Props>(
  ({ errors, label, theme = "white", ...rest }, ref) => {
    return (
      <label className="w-full">
        {label && (
          <p
            className={`text-sm lg:text-base font-medium ${
              theme === "dark" ? "text-dark_neutral_12" : "text-neutral_12"
            }`}
          >
            {label}
          </p>
        )}
        <textarea
          {...rest}
          ref={ref}
          className={`text-sm lg:text-base border-[1.5px] border-neutral_6 rounded-lg p-3 font-semibold ${
            theme === "dark" ? "text-dark_neutral_11" : "text-neutral_11"
          } outline-none w-full`}
        />
        {errors && <small className="text-red-600">{errors}</small>}
      </label>
    );
  }
);

TextArea.displayName = "TextArea";
