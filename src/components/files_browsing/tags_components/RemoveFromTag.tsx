import { useEffect, useRef, useState } from "react";
import LoadingSpinner from "../../common/LoadingSpinner";
import { useParams } from "next/navigation";
import { FaFile } from "react-icons/fa";
import { useApi } from "@/lib/useApi";

const RemoveFileFromTag = () => {
  const id = "remove_file_from_tag";
  const divRef = useRef<HTMLDivElement>(null);
  const [files, setFiles] = useState<{
    loading: boolean;
    error: string;
    pages: number;
    files: Array<{
      id: number;
      name: string;
      sizeInKb: number;
      duration?: number;
      resolution?: string;
      fps?: number;
      userId: string;
      createdAt: string;
      thumbnail: string;
      extension: string;
    }>;
  }>({
    loading: false,
    error: "",
    files: [],
    pages: 0,
  });
  const { tagId } = useParams() || "";
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [page, setPage] = useState<number>(1);
  const { api } = useApi();

  const fetchFiles = async (_page: number, name?: string) => {
    setFiles({ ...files, loading: true });

    try {
      const res = await api(
        `/tag/tag-files/${tagId}?` +
          `page=${_page || 1}&${name ? `fileName=${name}` : ""}`,
        "get",
      );
      if (res.data.statusCode === 200) {
        setFiles({
          error: "",
          files: res.data.data.files,
          loading: false,
          pages: res.data.data.pagesCount,
        });
      }
    } catch (error: any) {
      setFiles({
        ...files,
        error: error.response.data.message || "Error happened!",
        files: [],
        loading: false,
      });
    }
  };

  const removeFileFromTag = async (fileId: number, tagId: number) => {
    setFiles({ ...files, loading: true });
    try {
      const res = await api(`/tag/remove-file/${tagId}/${fileId}`, "delete");

      if (res.data.statusCode === 200) {
        const filteredFiles = files.files.filter((f) => f.id !== fileId);
        setFiles({
          ...files,
          error: "",
          loading: false,
          files: filteredFiles,
        });
      }
    } catch (error: any) {
      setFiles({
        ...files,
        error: error?.response?.data?.message || "Error happened!",
      });
    }
  };

  const hideDiv = () => {
    const element = document.getElementById(id);
    if (element) {
      element.style.visibility = "hidden";
      element.style.opacity = "0";
    }
  };

  const handleOutsideClick = (event: any) => {
    if (divRef.current && !divRef.current.contains(event.target)) {
      hideDiv();
    }
  };

  useEffect(() => {
    window.addEventListener("mousedown", handleOutsideClick);

    return () => {
      window.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);
  return (
    <div
      className="fixed m-auto h-screen inset-0 select-text cursor-default
      flex items-center justify-center bg-black bg-opacity-50 z-50   
      transition duration-300 p-3 invisible"
      id={id}
    >
      <div
        className="w-[500px] min-h-[151px] flex flex-col p-5 bg-neutral-800 rounded-xl border-[1px] border-white/10"
        ref={divRef}
      >
        <h1 className="sm:text-lg text-base font-semibold">
          Remove files from tag
        </h1>
        <div>
          <form
            className="flex items-center gap-2 no-wrap mt-4"
            id="sform"
            onSubmit={(e) => {
              e.preventDefault();
              const fname = (e.target as HTMLFormElement).elements.namedItem(
                "filename",
              ) as HTMLInputElement;
              if (!fname.value || fname.value.length < 1) {
                setFiles({ ...files, error: "Please enter a valid name" });
                return;
              }
              setPage(1);
              fetchFiles(1, fname.value);
            }}
          >
            <input
              type="text"
              placeholder="Search for a file..."
              className="h-10 p-2 w-full rounded-md outline-none text-black sm:text-sm text-xs"
              name="filename"
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button
              className="h-10 sm:p-2 p-1 bg-green-600 rounded-md sm:text-sm text-xs"
              type="submit"
            >
              search
            </button>
          </form>
        </div>
        {files.loading && (
          <div className="p-5 mt-3">
            <LoadingSpinner />
          </div>
        )}
        {files.error && !files.loading && (
          <p className="text-xs text-primary-400 mt-3">{files.error}</p>
        )}
        {!files.error && !files.loading && files.files.length > 0 && (
          <div className="grid grid-cols-2 mt-3">
            {files.files.map((f: any) => {
              return (
                <div
                  key={f.id}
                  className="flex items-center hover:underline hover:cursor-pointer gap-1"
                  onClick={() => {
                    removeFileFromTag(f.id, Number(tagId));
                  }}
                >
                  <div>
                    <FaFile size={15} />
                  </div>
                  <p className="sm:text-xs text-[11px] line-clamp-1 mt-1 truncate w-10/12">
                    {f.name}
                  </p>
                </div>
              );
            })}
          </div>
        )}
        <div className="w-full relative flex items-center mt-6">
          <button
            onClick={hideDiv}
            className="sm:text-sm text-xs p-2 bg-primary-500 rounded-md active:bg-primary-600"
          >
            close
          </button>
          <div className="flex gap-2 absolute top-2 right-0">
            <p
              className={`p-2 hover:bg-white/10 rounded-full hover:cursor-pointer ${[0, 1].includes(page) && "opacity-70"}`}
              onClick={() => {
                if (page > 1) {
                  fetchFiles(page - 1, searchTerm);
                  setPage(page - 1);
                }
              }}
            >
              {"<"}
            </p>
            <p
              className={`p-2 hover:bg-white/10 rounded-full hover:cursor-pointer ${files.pages <= page && "opacity-70"}`}
              onClick={() => {
                if (page < files.pages) {
                  fetchFiles(page + 1, searchTerm);
                  setPage(page + 1);
                }
              }}
            >
              {">"}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RemoveFileFromTag;
