"use client";
import FileComponent from "@/app/components/files_browsing/FileComponent";
import { formatDuration, formatFileSize } from "@/app/functions";

type FileType = {
  name: string;
  id: number;
  sizeInKb: number;
  createdAt: string;
  extension: string;
  type: "audio" | "video" | "image" | "other";
  resolution?: string;
  duration?: number;
  fps?: number;
  isFavourite: boolean;
};

type Props = {
  files: Array<FileType>;
};

const ListFiles = ({ files }: Props) => {
  return (
    <div className="flex flex-col flex-wrap gap-8 w-full">
      <div className="w-full flex flex-wrap gap-5">
        {files.map((f: FileType) => {
          const creationDate = new Date(f.createdAt);
          const size = formatFileSize(f.sizeInKb);
          const duration = f.duration ? formatDuration(f.duration) : undefined;
          return (
            <FileComponent
              key={f.id}
              fName={f.name}
              id={f.id}
              type={f.type}
              resolution={f.resolution}
              uploaded={creationDate.toLocaleDateString()}
              extenstion={f.extension}
              duration={duration}
              size={size}
              favourite={f.isFavourite}
              owner={""}
              image={
                "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.pexels.com%2Fsearch%2Fbeautiful%2F&psig=AOvVaw0JkUBG3KPo64_uCLDS2nPN&ust=1749788525378000&source=images&cd=vfe&opi=89978449&ved=0CBEQjRxqFwoTCLjXzbOE640DFQAAAAAdAAAAABAE"
              }
            />
          );
        })}
      </div>
    </div>
  );
};

export default ListFiles;
