export function CollectionCard(item: any) {
  return (
    <div
      style={{ backgroundImage: `url(${item.image_url})` }}
      className="bg-cover w-[413px] h-[369px] flex justify-center pt-16 rounded-2xl"
    >
      <h1 className="text-dark_neutral_12 text-[28px] font-bold text-center">
        {item.name}
      </h1>
    </div>
  );
}
