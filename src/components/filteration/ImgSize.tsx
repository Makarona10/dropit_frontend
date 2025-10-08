import { formatFileSize } from "@/app/functions";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";

const sizes = [256, 512, 1024, 2048, 4096];

const radioItems = sizes.map((e) => {
  return {
    id: e.toString(),
    label: () => {
      const formattedSize = formatFileSize(e);
      const sizeNum = formattedSize.split(".")[0];
      const unit = formattedSize.split(" ")[1];
      return `> ${sizeNum} ${unit}`;
    },
  };
});

export default function ImageSize() {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedDuration, setSelectedDuration] = useState("");
  const pathName = usePathname();
  const searchParams = useSearchParams();
  const router = useRouter();

  const divRef = useRef<HTMLDivElement>(null);
  const handleOutsideClick = (event: any) => {
    if (divRef.current && !divRef.current.contains(event.target)) {
      setIsOpen(false);
    }
  };
  useEffect(() => {
    window.addEventListener("mousedown", handleOutsideClick);

    return () => {
      window.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  const toggleDropdown = () => {
    setIsOpen((prev) => !prev);
  };

  const handleChange = (e: any) => {
    setSelectedDuration(e.target.value);
  };

  const setOrderParam = (duration: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("sizeInKb", duration);
    router.push(`${pathName}?${params.toString()}`);
  };

  return (
    <div className="relative inline-block text-left">
      <button
        onClick={toggleDropdown}
        className="text-white bg-primary-700 focus:outline-none font-medium rounded-lg sm:text-sm text-xs px-5 py-2.5 text-center inline-flex items-center"
        type="button"
      >
        Size{" "}
        <svg
          className="w-2.5 h-2.5 ms-3"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 10 6"
        >
          <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M1 1l4 4 4-4"
          />
        </svg>
      </button>

      {isOpen && (
        <div
          ref={divRef}
          className="absolute z-10 mt-2 w-48 bg-white divide-y divide-gray-100 rounded-lg shadow-sm dark:bg-gray-700 dark:divide-gray-600"
        >
          <ul className="p-3 space-y-3 sm:text-sm text-xs text-gray-700 dark:text-gray-200">
            {radioItems.map((item) => (
              <li key={item.id}>
                <div className="flex items-center">
                  <input
                    id={item.id.toString()}
                    type="radio"
                    name="SortBy"
                    value={item.id}
                    checked={selectedDuration === item.id}
                    onChange={(e) => {
                      handleChange(e);
                      setOrderParam(item.id);
                    }}
                    className="sm:w-4 sm:h-4 w-3 h-3 text-blue-600 bg-gray-100 border-gray-300 focus:ring-0"
                  />
                  <label
                    htmlFor={item.id}
                    className="ms-2 sm:text-sm text-xs font-medium text-gray-900 dark:text-gray-300"
                  >
                    {item.label()}
                  </label>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
