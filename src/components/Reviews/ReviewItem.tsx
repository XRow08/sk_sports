import { LikeIcon } from "../Icons/LikeIcon";
import RatingStars from "../RatingStars";

export function ReviewItem({ item }: { item: any }) {
  const name = "Murillo Augusto";
  return (
    <div className="border border-neutral_6 w-full flex flex-col justify-between rounded-lg p-4">
      <div className="flex items-center justify-between w-full mb-5">
        <div className="flex items-center gap-1">
          <div className="bg-neutral_12 text-neutral_4 uppercase flex items-center justify-center rounded-full h-8 w-8">
            {name.charAt(0)}
          </div>
          <div className="text-lg font-bold">{name}</div>
        </div>
        <RatingStars rate={4} />
      </div>
      <div>
        <h1 className="text-xl font-semibold">Produto excelente!</h1>
        <p className="">
          Eu fiquei completamente encantado com a qualidade dessas camisas. O
          tecido é incrivelmente leve e respirável, perfeito para quem pratica
          esportes ou gosta de usar no dia a dia. Além disso, a durabilidade é
          notável; mesmo após várias lavagens, as cores permanecem vivas e o
          material não desgasta. Dá para sentir que é um produto premium, e vale
          cada centavo investido!
        </p>
      </div>
      <p className="text-neutral_11 flex items-center gap-3 cursor-pointer mt-7">
        Está avaliação foi útil?
        <span className="flex items-center gap-1">
          <LikeIcon /> Sim (0)
        </span>
      </p>
    </div>
  );
}
