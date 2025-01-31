"use client";
import { useState } from "react";

export function Personalization({ onChange }: { onChange?: (e: any) => void }) {
  const [isPerso, setIsPerso] = useState(false);
  const [persoValues, setPersoValues] = useState({
    perso_text: "",
    perso_number: "",
  });

  const handleChangePersonalization = (
    type: "text" | "number",
    value: string
  ) => {
    const newValues = {
      ...persoValues,
      [type === "text" ? "perso_text" : "perso_number"]: value,
    };
    setPersoValues(newValues);
    onChange?.(newValues);
  };

  return (
    <div className="flex flex-col w-full p-4 gap-3 font-medium border rounded-lg transition-all duration-300 ease-in-out">
      <h1 className="text-neutral_11 font-medium">
        Personalizar (R$20 de acréscimo):{" "}
        <span className="font-bold">
          {isPerso ? "Personalizar" : "Não personalizar"}
        </span>
      </h1>
      <div className="flex items-center gap-3">
        <h1
          onClick={() => setIsPerso(false)}
          className={`text-sm lg:text-base font-medium flex items-center gap-2 cursor-pointer p-3 border rounded-lg ${
            !isPerso ? "border-neutral_8" : "border-neutral_6 text-neutral_11"
          }`}
        >
          <div
            className={`w-4 h-4 rounded-full border border-neutral_6 transition-all ease-in-out duration-300 ${
              !isPerso ? "bg-neutral_12" : "bg-transparent"
            }`}
          />
          Não personalizar
        </h1>
        <h1
          onClick={() => setIsPerso(true)}
          className={`text-sm lg:text-base font-medium flex items-center gap-2 cursor-pointer p-3 border rounded-lg ${
            isPerso ? "border-neutral_8" : "border-neutral_6 text-neutral_11"
          }`}
        >
          <div
            className={`w-4 h-4 rounded-full border border-neutral_6 transition-all ease-in-out duration-300 ${
              isPerso ? "bg-neutral_12" : "bg-transparent"
            }`}
          />
          Personalizar
        </h1>
      </div>

      {isPerso && (
        <div className="flex flex-col lg:flex-row items-center gap-3 justify-between w-full">
          <input
            placeholder="Digite o nome desejado"
            onChange={(e) =>
              handleChangePersonalization("text", e.target.value)
            }
            className={`p-3 border w-full rounded-lg outline-none ${
              !isPerso ? "border-neutral_8" : "border-neutral_6 text-neutral_11"
            }`}
          />
          <input
            placeholder="Digite o número desejado"
            onChange={(e) =>
              handleChangePersonalization("number", e.target.value)
            }
            type="number"
            className={`p-3 border w-full rounded-lg outline-none ${
              !isPerso ? "border-neutral_8" : "border-neutral_6 text-neutral_11"
            }`}
          />
        </div>
      )}
    </div>
  );
}
