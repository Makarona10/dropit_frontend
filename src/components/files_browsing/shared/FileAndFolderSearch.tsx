import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRouter, useSearchParams } from "next/navigation";

interface _Props {
  placeholder: string;
}

const SearchSharedItem = ({ placeholder }: _Props) => {
  const searchParams = useSearchParams();
  const router = useRouter();

  const handleSubmit = (e: any) => {
    e.preventDefault();
    const params = new URLSearchParams(searchParams.toString());
    const name = e.target[0].value;
    if (name) {
      params.set("name", name);
      router.push(`?${params.toString()}`);
    }
  };

  return (
    <form
      className="flex items-center sm:w-[400px] w-[240px]
      my-4 bg-neutral-800 md:text-sm text-xs p-3 px-5 gap-3 rounded-xl"
      onSubmit={handleSubmit}
    >
      <FontAwesomeIcon
        width={15}
        height={15}
        className="relative opacity-60"
        icon={faMagnifyingGlass}
      />
      <input
        type="text"
        placeholder={"Search for a shared " + placeholder.toLowerCase()}
        className="w-full bg-transparent outline-none ring-0 ring-offset-0 placeholder:text-neutral-400"
      />
    </form>
  );
};

export default SearchSharedItem;
