import { useEffect, useRef, useState } from "react";
import LoadingSpinner from "../../common/LoadingSpinner";
import { useParams, useRouter } from "next/navigation";
import axios from "axios";
import { FaFile } from "react-icons/fa";

const AddFileToTag = () => {
  const id = "add_file_to_tag";
  const divRef = useRef<HTMLDivElement>(null);
  const [files, setFiles] = useState({
    loading: false,
    error: "",
    files: [],
    pages: 0,
  });
  const { tagId } = useParams() || "";
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [page, setPage] = useState<number>(1);
  const [token, setToken] = useState<string>("");
  const router = useRouter();

  const fetchFiles = async (name: string, page: number) => {
    setFiles({ ...files, loading: true });

    if (!token) {
      router.push("/user/login");
    }
    if (!name || name.length < 1) {
      setFiles({
        ...files,
        error: "Please enter a valid file name",
        loading: false,
      });
      return;
    }

    try {
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_SERVER_URI}/search/files/${name}?page=${page || 1}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      if (res.data.statusCode === 200) {
        setFiles({
          error: "",
          files: res.data.data.files,
          loading: false,
          pages: res.data.data.pages,
        });
      }
    } catch (error: any) {
      if (error?.response?.data?.statusCode === 401) router.push("/user/login");
      setFiles({
        ...files,
        error: error.response.data.message || "Error happened!",
        files: [],
        loading: false,
      });
    }
  };

  const addFileToTag = async (fileId: number, tagId: number) => {
    if (!token) router.push("/user/login");
    try {
      await axios.post(
        `${process.env.NEXT_PUBLIC_SERVER_URI}/tag/add-file/${tagId}/${fileId}`,
        {},
        { headers: { Authorization: `Bearer ${token}` } },
      );
      window.location.reload();
    } catch (error: any) {
      setFiles({
        ...files,
        error: error?.response?.data?.message || "Error happened!",
      });
    }
  };

  useEffect(() => {
    const tok = localStorage.getItem("access_token") || "";
    setToken(tok);
  }, []);

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
              fetchFiles(fname.value);
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
    </div>
  );
};

export default AddFileToTag;
