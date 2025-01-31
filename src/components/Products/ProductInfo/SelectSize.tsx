"use client";
import { sizeList } from "@/constants";
import { useState } from "react";

type Props = {
  sizes: string[];
  onChange: (size: string) => void;
};

export function SelectSize({ sizes, onChange }: Props) {
  const [size, setSize] = useState("");

  const handleChangeSize = (size: string) => {
    setSize(size);
    onChange(size);
  };

  return (
    <div className="w-full">
      <h1 className="text-neutral_11 font-medium mb-3">
        Tamanho: <span className="font-bold text-neutral_12">{size}</span>
      </h1>
      <div className="flex flex-wrap gap-2 w-full mb-4">
        {sizeList.map((e) => {
          const isSelected = size === e.name;
          const isAvailable = sizes.includes(e.name.toLowerCase());
          return (
            <div
              key={e.name}
              onClick={() =>
                isAvailable ? handleChangeSize(e.name) : undefined
              }
              className={`flex items-center justify-center w-[64px] px-3 py-2 font-medium border cursor-pointer rounded-lg transition-all duration-300 ease-in-out ${
                isSelected
                  ? "border-dark_neutral_6 bg-dark_neutral_1 text-dark_neutral_12"
                  : isAvailable
                  ? "border-neutral_6 hover:border-neutral_8 bg-transparent"
                  : "border-neutral_3 bg-transparent text-dark_neutral_8"
              } `}
            >
              {e.name}
            </div>
          );
        })}
      </div>
    </div>
  );
}
