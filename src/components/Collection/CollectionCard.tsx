export function CollectionCard(item: any) {
  return (
    <div
      style={{ backgroundImage: `url(${item.image_url})` }}
      className="bg-cover w-full lg:w-[413px] h-[200px] lg:h-[369px] flex justify-center pt-4 lg:pt-16 rounded-2xl"
    >
      <h1 className="text-dark_neutral_12 text-xl lg:text-[28px] font-bold text-center">
        {item.name}
      </h1>
    </div>
  );
}
