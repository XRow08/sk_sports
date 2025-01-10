import { IProductRate, IUser } from "@/interfaces";
import { LikeIcon } from "../Icons/LikeIcon";
import RatingStars from "../RatingStars";
import { ProductService, UserService } from "@/services";
import { useEffect, useState } from "react";
import Image from "next/image";

export function ReviewItem({ item }: { item: IProductRate }) {
  const [user, setUser] = useState<IUser | null>(null);
  const [isLiked, setIsLiked] = useState(false);
  const [likes, setLikes] = useState(item.likes);

  useEffect(() => {
    async function getDate() {
      const user = await UserService.findOneById(item.user_id);
      setUser(user);
    }
    getDate();
  }, [item]);

  async function onLike() {
    setIsLiked(!isLiked);
    const newLikes = isLiked ? likes - 1 : likes + 1;
    setLikes(newLikes);
    await ProductService.updateRateProduct(item.id, {
      likes: newLikes,
    });
  }

  return (
    <div className="border border-neutral_6 w-full flex flex-col justify-between rounded-lg p-4">
      <div className="flex items-center justify-between w-full mb-5">
        <div className="flex items-center gap-1">
          <div className="bg-neutral_12 text-neutral_4 uppercase flex items-center justify-center rounded-full h-8 w-8">
            {user?.first_name.charAt(0)}
          </div>
          <div className="text-lg font-bold">{user?.first_name}</div>
        </div>
        <RatingStars rate={item.rate} />
      </div>
      <div>
        {item.images.length > 0 && (
          <div className="flex items-center gap-4 h-[80px] mb-5">
            {item.images.map((e, index) => (
              <Image
                key={index}
                src={e}
                alt={`Preview ${index + 1}`}
                width={10000}
                height={10000}
                className="w-[80px] h-full rounded-lg object-cover"
              />
            ))}
          </div>
        )}
        <h1 className="text-xl font-semibold">{item.title}</h1>
        <p className="">{item.comment}</p>
      </div>
      <p className="text-neutral_11 flex items-center gap-3 mt-7">
        Está avaliação foi útil?
        <span
          onClick={onLike}
          className="flex items-center gap-1 cursor-pointer"
        >
          <LikeIcon /> Sim ({likes})
        </span>
      </p>
    </div>
  );
}
