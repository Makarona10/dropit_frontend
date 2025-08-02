import axios from "axios";

export function formatDuration(seconds: number): string {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = Math.floor(seconds % 60);

  const mm = String(minutes).padStart(2, "0");
  const ss = String(remainingSeconds).padStart(2, "0");

  return `${mm}:${ss}`;
}

export function formatFileSize(sizeInKb: number): string {
  if (sizeInKb > 1000 * 1000) {
    return `${(sizeInKb / (1000 * 1000)).toFixed(2)} GB`;
  } else if (sizeInKb > 1000) {
    return `${(sizeInKb / 1000).toFixed(2)} MB`;
  } else {
    return `${sizeInKb.toFixed(2)} KB`;
  }
}

export const downloadFile = async (
  id: number,
  token: string,
  fileName: string,
) => {
  try {
    const res = await axios.get(
      `${process.env.NEXT_PUBLIC_SERVER_URI}/file/download/${id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        responseType: "blob",
      },
    );

    const contentType =
      res.headers["content-type"] || "application/octet-stream";

    const blob = new Blob([res.data], { type: contentType });

    const url = window.URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = fileName;
    document.body.appendChild(link);
    link.click();

    window.URL.revokeObjectURL(url);
    document.body.removeChild(link);
  } catch (error) {}
};
