import SharedComponent, { SharedComponentProps } from "./SharedComponent";
import NoSharedItems from "./NoSharedItems";

interface SharedComponentsProps {
  files: SharedComponentProps[];
  title?: string;
}

const ListSharedComponents = ({ files, title }: SharedComponentsProps) => {
  if (files.length < 1) return <NoSharedItems title={title} />;
  return (
    <div className="flex flex-col gap-2 w-full">
      <div className="p-3 w-full flex items-center text-neutral-100 text-sm font-bold">
        <div>
          <h1>Type</h1>
        </div>
        <div className="ml-5">
          <h1>Item Name</h1>
        </div>
        <div className="hidden md:flex flex-col items-end flex-1">
          <h1>Owner name</h1>
        </div>
        {title?.toLowerCase() !== "folders" && (
          <div className="flex flex-1 sm:flex-none flex-row-reverse ml-10 sm:mr-6 p-3">
            <h1>Download</h1>
          </div>
        )}
      </div>
      {files.map((f, idx) => (
        <SharedComponent key={f.id} {...f} />
      ))}
    </div>
  );
};

export default ListSharedComponents;
