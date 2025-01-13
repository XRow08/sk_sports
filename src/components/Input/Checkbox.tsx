import { InputHTMLAttributes, useState } from "react";

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  errors?: string;
  label?: string;
  theme?: string;
  itens?: any[];
  onChangeSelected?: (selected: (string | number)[]) => void;
}

export function CheckBox({
  errors,
  label,
  theme = "white",
  itens,
  onChangeSelected,
  ...rest
}: Props) {
  const [selectedItems, setSelectedItems] = useState<(string | number)[]>([]);
  const handleCheckboxChange = (id: string | number) => {
    setSelectedItems((prev) => {
      const updatedSelection = prev.includes(id)
        ? prev.filter((item) => item !== id)
        : [...prev, id];
      onChangeSelected?.(updatedSelection);
      return updatedSelection;
    });
  };

  return (
    <div>
      {label && (
        <p
          className={`text-sm lg:text-base font-medium ${
            theme === "dark" ? "text-dark_neutral_12" : "text-neutral_12"
          }`}
        >
          {label}
        </p>
      )}
      <div className="flex flex-wrap gap-2">
        {itens?.map((e) => {
          const isChecked = selectedItems.includes(e.value);
          return (
            <label
              key={e.value}
              className={`w-max text-sm lg:text-base border-[1.5px] rounded-lg px-3 py-2 font-semibold cursor-pointer transition-all duration-300 ease-in-out
              ${
                isChecked
                  ? "border-dark_neutral_1 bg-dark_neutral_1 text-neutral_1"
                  : "border-neutral_6 bg-transparent"
              }
              ${
                theme === "dark" ? "text-dark_neutral_11" : "text-neutral_11"
              } outline-none`}
            >
              <input
                {...rest}
                type="checkbox"
                checked={isChecked}
                onChange={() => handleCheckboxChange(e.value)}
                className={`sr-only`}
              />
              <h1>{e.name}</h1>
            </label>
          );
        })}
      </div>
      {errors && <small className="text-red-600">{errors}</small>}
    </div>
  );
}
