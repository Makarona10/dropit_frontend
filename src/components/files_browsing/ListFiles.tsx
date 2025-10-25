"use client";
import FileComponent from "@/components/files_browsing/FileComponent";
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
  deleted?: boolean;
  thumbnail?: string;
  userId?: string;
};

type Props = {
  files: Array<FileType>;
};

const ListFiles = ({ files }: Props) => {
  return (
    <div className="w-full">
      <div className="flex flex-wrap gap-5">
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
              deleted={f?.deleted}
              thumbnail={f.thumbnail || ""}
              userId={f.userId}
              fps={f?.fps || 0}
            />
          );
        })}
      </div>
    </div>
  );
};

export default ListFiles;
