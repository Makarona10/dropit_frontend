export type _File = {
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

export type _Folder = {
  id: number;
  name: string;
  path: string;
  userId: string;
  createdAt: Date;
};
