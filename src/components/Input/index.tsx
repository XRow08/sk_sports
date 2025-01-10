import React, { InputHTMLAttributes } from "react";

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  errors?: string;
  label?: string;
}

export function Input({ errors, label, ...rest }: Props) {
  return (
    <label>
      {label && <p className="font-medium">{label}</p>}
      <input
        {...rest}
        className="border-[1.5px] border-neutral_6 rounded-lg p-3 font-semibold text-neutral_11 outline-none w-full"
      />
      {errors && <small className="text-red-600">{errors}</small>}
    </label>
  );
}
