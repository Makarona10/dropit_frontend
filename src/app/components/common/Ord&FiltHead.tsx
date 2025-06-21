"use client";
import { TbArrowsSort } from "react-icons/tb";
import { LuListFilter } from "react-icons/lu";
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

export type FT = {
  name: string;
  ico?: IconType;
};

type Prop = {
  name: string;
  ico?: IconType;
};

type Props = { order: Prop[]; filter: Prop[] };

const OrdAndFiltHead = ({ order, filter }: Props) => {
  const [selectedSorting, setSelectedSorting] = useState(null);
  const [selectedFilter, setSelectedFilter] = useState(null);
  const router = useRouter();
  const pathName = usePathname();
  const searchParams = useSearchParams();
  const sParams = new URLSearchParams(searchParams.toString());

  useEffect(() => {
    const filt: string | null =
      selectedFilter?.entries()?.next()?.value[0] || null;
    const ord: string | null =
      selectedSorting?.entries()?.next()?.value[0] || null;

    filt && sParams.set("f", filt.toString());
    ord && sParams.set("o", ord.toString());
    router.push(pathName + "?" + sParams);
  }, [selectedFilter, selectedSorting]);

  return (
    <div>
      <div className="flex items-center gap-8">
        {order && order.length > 0 && (
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
              {order.map((o: Prop) => {
                const Icon = o.ico;
                return (
                  <DropdownItem key={o.name} className="p-2">
                    <div className="flex items-center gap-2">
                      {Icon ? <Icon /> : ""}
                      <p>{o.name}</p>
                    </div>
                  </DropdownItem>
                );
              })}
            </DropdownMenu>
          </Dropdown>
        )}
        {filter && filter.length > 0 && (
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
              {filter.map((t: FT) => {
                const Icon = t.ico;
                return (
                  <DropdownItem key={t.name} className="p-2">
                    <div className="flex items-center gap-2 sm:text-base text-sm">
                      {Icon ? <Icon /> : ""}
                      <p>{t.name.toLocaleLowerCase()}</p>
                    </div>
                  </DropdownItem>
                );
              })}
            </DropdownMenu>
          </Dropdown>
        )}
      </div>
    </div>
  );
};

export default OrdAndFiltHead;
