import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";

const checkboxItems = [
  { id: "desc", label: "Descendent" },
  { id: "asc", label: "Ascendent" },
];

export default function Order() {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState("desc");
  const pathName = usePathname();
  const searchParams = useSearchParams();
  const router = useRouter();
  const divRef = useRef<HTMLDivElement>(null);

  const toggleDropdown = () => {
    setIsOpen((prev) => !prev);
  };

  const handleChange = (e: any) => {
    setSelectedOption(e.target.value);
  };

  const setOrderParam = (order: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("order", order);
    router.push(`${pathName}?${params.toString()}`);
  };

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

  return (
    <div className="relative inline-block text-left">
      <button
        onClick={toggleDropdown}
        className="text-white bg-primary-700 focus:outline-none font-medium rounded-lg sm:text-sm text-xs px-5 py-2.5 text-center inline-flex items-center active:scale-95 duration-100"
        type="button"
      >
        Order
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
            {checkboxItems.map((item) => (
              <li key={item.id}>
                <div className="flex items-center">
                  <input
                    id={item.id}
                    type="radio"
                    name="orderBy"
                    value={item.id}
                    checked={selectedOption === item.id}
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
                    {item.label}
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
