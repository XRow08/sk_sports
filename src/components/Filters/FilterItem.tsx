import { ArrowIcon } from "../Icons";

type Props = {
  title: string;
  isOpen: boolean;
  onClick: (e: any) => void;
  children: React.ReactNode;
};

export function FilterItem({ title, isOpen, onClick, children }: Props) {
  return (
    <div className="w-full">
      <div
        onClick={onClick}
        className="font-medium border-b w-full h-full flex items-center justify-between cursor-pointer bg-transparent transition-all ease-in-out duration-300 hover:bg-neutral_3 border-neutral_6 py-3 px-3"
      >
        <h1 className="font-medium w-full">{title}</h1>
        <ArrowIcon rotate={isOpen ? 90 : 0} />
      </div>
      <div className={`overflow-hidden w-full ${isOpen ? "h-full" : "h-0"}`}>
        <div className="p-4 w-full">{children}</div>
      </div>
    </div>
  );
}
