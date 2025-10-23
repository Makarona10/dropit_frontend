export const permittedImages = [
  "jpg",
  "jpeg",
  "png",
  "gif",
  "wav",
  "tiff",
  "svg",
  "ico",
  "avif",
  "webp",
  "apng",
  "jfif",
  "pjpeg",
  "pjp",
];

export const permittedVideos = [
  "mp4",
  "mov",
  "avi",
  "flv",
  "mkv",
  "wmv",
  "webm",
  "mpeg",
];

export const permittedOtherExtensions = [
  "txt",
  "doc",
  "gz",
  "pdf",
  "deb",
  "docx",
  "rar",
  "zip",
  "mp3",
  "exe",
  "7z",
];

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
  thumbnail?: string;
};

export type _Folder = {
  id: number;
  name: string;
  path: string;
  userId: string;
  createdAt: Date;
};
