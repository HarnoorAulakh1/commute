"use client";
import { GoHash } from "react-icons/go";
import { RiGeminiLine } from "react-icons/ri";
import { HiOutlineDotsHorizontal } from "react-icons/hi";
import { IoIosInformationCircleOutline } from "react-icons/io";
import { usePathname } from "next/navigation";

function Title() {
  const path = usePathname();

  return (
    <div className="text-[#76747f] flex flex-row items-center w-full font-bold justify-between p-4 shadow-sm border-b-[1px] border-[#dfdfdf]">
      <div className=" flex flex-row items-center gap-2">
        <div className="bg-[#fefefe] rounded-md p-1">
          <GoHash className="bg-white" />
        </div>

        <span className="hover:cursor-pointer">
          {path.length==3 &&  path.split("/")[2].toUpperCase()}
        </span>
      </div>
      <div className="flex flex-row items-center gap-4">
        <div className="hover:bg-[#e3e3e8] p-1 rounded-md">
          <HiOutlineDotsHorizontal className="hover:cursor-pointer" />
        </div>
        <div className="hover:bg-[#e3e3e8] p-1 rounded-md">
          <RiGeminiLine className="hover:cursor-pointer" />
        </div>
        <div className="hover:bg-[#e3e3e8] p-1 rounded-md">
          <IoIosInformationCircleOutline className="hover:cursor-pointer" />
        </div>
      </div>
    </div>
  );
}

export default Title;
