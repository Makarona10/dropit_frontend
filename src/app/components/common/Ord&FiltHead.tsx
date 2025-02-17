"use client";
import { TbArrowsSort } from "react-icons/tb";
import { BiUpArrowAlt, BiDownArrowAlt } from "react-icons/bi";
import {
  LuImages,
  LuFileVideo,
  LuAudioLines,
  LuListFilter,
  LuFilterX,
} from "react-icons/lu";
import { IoDocumentText } from "react-icons/io5";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Button,
} from "@heroui/react";
import { useEffect, useState } from "react";
import { IconType } from "react-icons";
import { usePathname, useSearchParams, useRouter } from "next/navigation";

type FT = {
  name: string;
  ico: IconType;
};
const filter_array: FT[] = [
  {
    name: "Images",
    ico: LuImages,
  },
  {
    name: "Videos",
    ico: LuFileVideo,
  },
  {
    name: "Audios",
    ico: LuAudioLines,
  },
  {
    name: "Others",
    ico: IoDocumentText,
  },
  {
    name: "All",
    ico: LuFilterX,
  },
];

const OrdAndFiltHead = () => {
  const [selectedSorting, setSelectedSorting] = useState(new Set(["Newest"]));
  const [selectedFilter, setSelectedFilter] = useState(new Set(["All"]));
  const router = useRouter();
  const pathName = usePathname();
  const searchParams = useSearchParams();
  const sParams = new URLSearchParams(searchParams.toString());

  useEffect(() => {
    const filt: string = selectedFilter.entries().next().value[0];
    const ord: string = selectedSorting.entries().next().value[0];

    sParams.set("f", filt.toString());
    sParams.set("o", ord.toString());
    router.push(pathName + "?" + sParams);
  }, [selectedFilter, selectedSorting]);

  return (
    <div>
      <div className="flex items-center gap-8">
        <Dropdown>
          <DropdownTrigger>
            <Button
              className="flex items-center capitalize sm:w-24 w-20
              outline-none border-0 ring-0 ring-offset-0 rounded-lg bg-neutral-700/20
              text-xs sm:text-sm"
              variant="ghost"
            >
              Order
              <TbArrowsSort />
            </Button>
          </DropdownTrigger>
          <DropdownMenu
            disallowEmptySelection
            aria-label="Multiple selection example"
            closeOnSelect={true}
            selectedKeys={selectedSorting}
            selectionMode="single"
            variant="faded"
            onSelectionChange={setSelectedSorting}
            className="sm:ml-8 text-center bg-neutral-800 rounded-md text-sm sm:text-base"
          >
            <DropdownItem key="Newest" className="p-2">
              <div className="flex items-center gap-2">
                <BiUpArrowAlt />
                <p>Newest</p>
              </div>
            </DropdownItem>
            <DropdownItem key="Oldest" className="p-2">
              <div className="flex items-center gap-2">
                <BiDownArrowAlt />
                <p>Oldest</p>
              </div>
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>

        <Dropdown>
          <DropdownTrigger>
            <Button
              className="flex items-center capitalize sm:w-24 w-20 outline-none
              border-0 ring-0 ring-offset-0 rounded-lg bg-neutral-700/20
              sm:text-sm text-xs"
              variant="ghost"
            >
              Filter
              <LuListFilter />
            </Button>
          </DropdownTrigger>
          <DropdownMenu
            disallowEmptySelection
            aria-label="Multiple selection example"
            closeOnSelect={true}
            selectedKeys={selectedFilter}
            selectionMode="single"
            variant="faded"
            onSelectionChange={setSelectedFilter}
            className="sm:ml-8 text-center bg-neutral-800 rounded-md"
          >
            {filter_array.map((t: FT) => {
              const Icon = t.ico;
              return (
                <DropdownItem key={t.name} className="p-2">
                  <div className="flex items-center gap-2 sm:text-base text-sm">
                    <Icon />
                    <p>{t.name}</p>
                  </div>
                </DropdownItem>
              );
            })}
          </DropdownMenu>
        </Dropdown>
      </div>
    </div>
  );
};

export default OrdAndFiltHead;
