import { TbShareOff } from "react-icons/tb";

interface NoSharedItemsProps {
  title?: string;
}

const NoSharedItems = ({ title }: NoSharedItemsProps) => {
  return (
    <div className="flex flex-col text-neutral-100 sm:text-4xl text-xl items-center font-bold justify-center gap-2 h-full py-10">
      <TbShareOff style={{ width: "60px", height: "60px" }} />
      <h1>No shared {title?.toLowerCase()}</h1>
    </div>
  );
};

export default NoSharedItems;
