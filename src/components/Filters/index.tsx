"use client";
import { useState } from "react";
import { Button } from "../Button";
import { Input } from "../Input";
import { FilterItem } from "./FilterItem";
import { FormatNumber } from "@/helpers";
import { sizeList } from "@/constants";

export function Filters({ onChange }: { onChange: (e: any) => void }) {
  const { formatToBRL } = FormatNumber;
  const [size, setSize] = useState("");
  const [filter, setFilter] = useState(0);
  const [gender, setGender] = useState("");
  const [priceFilter, setPriceFilter] = useState<any>({
    minPrice: "",
    maxPrice: "",
  });

  function handleChangePrice(min: boolean, value: string) {
    const rawValue = value.replace(/[^0-9]/g, "");
    const numericValue = parseFloat(rawValue) / 100;
    setPriceFilter((prev: any) => ({
      ...prev,
      [min ? "minPrice" : "maxPrice"]: numericValue,
    }));
  }

  function handleGender(value: string) {
    if (value === gender) return setGender("");
    setGender(value);
  }

  function onSelect(e: React.MouseEvent<HTMLDivElement>, select: number) {
    if (e.target === e.currentTarget) return setFilter(0);
    if (select === filter) return setFilter(0);
    setFilter(select);
  }

  const updateQueryString = () => {
    const url = new URL(window.location.href);
    url.search = "";
    const filters = { size, gender, ...priceFilter };
    onChange(filters);
  };

  return (
    <div className="min-w-[306px] w-[306px] h-full hidden lg:flex flex-col border border-neutral_6 rounded-lg">
      <h1 className="text-[28px] font-bold p-3">Filtros</h1>
      <div className="flex flex-col w-full">
        <FilterItem
          title="Preço"
          isOpen={filter === 1}
          onClick={(e) => onSelect(e, 1)}
        >
          <div className="flex items-center gap-2">
            <div className="w-full">
              <h1 className="mb-2">Preço mínimo</h1>
              <Input
                type="text"
                placeholder="R$ 0,00"
                value={
                  priceFilter.minPrice !== undefined &&
                  priceFilter.minPrice !== null
                    ? formatToBRL(priceFilter.minPrice.toString())
                    : ""
                }
                onChange={({ target }) => handleChangePrice(true, target.value)}
              />
            </div>
            <div className="w-full flex flex-col items-end justify-end">
              <h1 className="mb-2">Preço máximo</h1>
              <Input
                type="text"
                placeholder="R$ 100,00"
                value={
                  priceFilter.maxPrice
                    ? formatToBRL(priceFilter.maxPrice.toString())
                    : ""
                }
                onChange={({ target }) =>
                  handleChangePrice(false, target.value)
                }
              />
            </div>
          </div>
        </FilterItem>
        <FilterItem
          title="Tamanho"
          isOpen={filter === 2}
          onClick={(e) => onSelect(e, 2)}
        >
          <div className="grid grid-cols-2 gap-2 w-full">
            {sizeList.map((e) => {
              const isSelected = size === e.name;
              return (
                <div
                  key={e.name}
                  onClick={() => setSize(e.name)}
                  className={`flex items-center justify-center w-full px-3 py-2 font-medium border cursor-pointer rounded-lg transition-all duration-300 ease-in-out ${
                    isSelected
                      ? "border-dark_neutral_6 bg-dark_neutral_1 text-dark_neutral_12"
                      : "border-neutral_6 hover:border-neutral_8 bg-transparent"
                  } `}
                >
                  {e.name}
                </div>
              );
            })}
          </div>
        </FilterItem>
        <FilterItem
          title="Gênero"
          isOpen={filter === 3}
          onClick={(e) => onSelect(e, 3)}
        >
          <div className="flex items-center gap-3">
            <h1
              onClick={() => handleGender("male")}
              className={`font-medium flex items-center gap-2 cursor-pointer p-3 border rounded-lg w-full select-none ${
                gender === "male"
                  ? "border-neutral_8"
                  : "border-neutral_6 text-neutral_11"
              }`}
            >
              <div
                className={`w-4 h-4 rounded-full border border-neutral_6 transition-all ease-in-out duration-300 ${
                  gender === "male" ? "bg-neutral_12" : "bg-transparent"
                }`}
              />
              Homem
            </h1>
            <h1
              onClick={() => handleGender("female")}
              className={`font-medium flex items-center gap-2 cursor-pointer p-3 border rounded-lg w-full select-none ${
                gender === "female"
                  ? "border-neutral_8"
                  : "border-neutral_6 text-neutral_11"
              }`}
            >
              <div
                className={`w-4 h-4 rounded-full border border-neutral_6 transition-all ease-in-out duration-300 ${
                  gender === "female" ? "bg-neutral_12" : "bg-transparent"
                }`}
              />
              Mulher
            </h1>
          </div>
        </FilterItem>
      </div>
      <div className="px-3 w-full my-3">
        <Button className="w-full" onClick={updateQueryString}>
          Aplicar filtro{" "}
        </Button>
      </div>
    </div>
  );
}
