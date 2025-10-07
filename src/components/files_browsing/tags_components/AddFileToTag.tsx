import { useRef, useState } from "react";
import LoadingSpinner from "../../common/LoadingSpinner";
import { useParams } from "next/navigation";
import { FaFile } from "react-icons/fa";
import { useApi } from "@/lib/useApi";
import Modal, { ModalProps } from "@/components/common/Modal";

const AddFileToTag = ({ isOpen, onClose }: ModalProps) => {
  const [files, setFiles] = useState({
    loading: false,
    error: "",
    files: [],
    pages: 0,
  });
  const { tagId } = useParams() || "";
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [page, setPage] = useState<number>(1);
  const { api } = useApi();

  const fetchFiles = async (name: string, page: number) => {
    setFiles({ ...files, loading: true });

    if (!name || name.length < 1) {
      setFiles({
        ...files,
        error: "Please enter a valid file name",
        loading: false,
      });
      return;
    }

    try {
      const res = await api(`/search/files/${name}?page=${page || 1}`, "get");
      if (res.data.statusCode === 200) {
        setFiles({
          error: "",
          files: res.data.data.files,
          loading: false,
          pages: res.data.data.pages,
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

  const addFileToTag = async (fileId: number, tagId: number) => {
    try {
      await api(`/tag/add-file/${tagId}/${fileId}`, "post");
      window.location.reload();
    } catch (error: any) {
      setFiles({
        ...files,
        error: error?.response?.data?.message || "Error happened!",
      });
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="w-[500px] min-h-[151px] flex flex-col">
        <h1 className="sm:text-lg text-base font-semibold">
          Add file to the tag
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
              setPage(1);
              fetchFiles(fname.value, page);
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
                    addFileToTag(f.id, Number(tagId));
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
            onClick={onClose}
            className="sm:text-sm text-xs p-2 bg-primary-500 rounded-md active:bg-primary-600"
          >
            close
          </button>
          <div className="flex gap-2 absolute top-2 right-0">
            <p
              className={`p-2 hover:bg-white/10 rounded-full hover:cursor-pointer ${[0, 1].includes(page) && "opacity-70"}`}
              onClick={() => {
                if (page > 1) {
                  fetchFiles(searchTerm, page - 1);
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
                  fetchFiles(searchTerm, page + 1);
                  setPage(page + 1);
                }
              }}
            >
              {">"}
            </p>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default AddFileToTag;
