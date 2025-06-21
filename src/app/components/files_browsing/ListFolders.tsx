"use client";
import FileComponent from "@/app/components/files_browsing/FileComponent";
import Folder from "./Folder";

type FolderType = {
  name: string;
  id: number;
  userId: string;
  createdAt: string;
  path: string;
};

type Props = {
  folders: Array<FolderType>;
};

const ListFolders = ({ folders }: Props) => {
  return (
    <div className="flex flex-col flex-wrap gap-8 w-full">
      <div className="w-full flex flex-wrap gap-4">
        {folders.map((f: FolderType) => {
          const cAt = new Date(f.createdAt);
          const createdAt = cAt.toLocaleDateString();
          return (
            <Folder key={f.id} name={f.name} id={f.id} created_at={createdAt} />
          );
        })}
      </div>
    </div>
  );
};

export default ListFolders;
