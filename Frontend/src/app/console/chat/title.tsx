"use client";

import { GoHash } from "react-icons/go";
import { HiOutlineDotsHorizontal } from "react-icons/hi";
import { RiGeminiLine } from "react-icons/ri";
import { IoIosInformationCircleOutline } from "react-icons/io";
import { useEffect, useState,useContext } from "react";
import { userContext } from "@/app/components/profile";
import { channel } from "@/types";

function Title() {
  const { user } = useContext(userContext);
  const [channel, setChannel] = useState<channel>();
  useEffect(() => {
    async function handle() {
        if(!user.c_channel)
            return;
      const response = await fetch(
        `/api/channel/getChannel?id=${user.c_channel}`,
        {
          method: "GET",
          mode: "cors",
          credentials: "include",
        }
      );
      const data = await response.json();
      setChannel(data);
    }
    handle();
  }, [user.c_channel]);
  return (
    <div className="text-[#76747f] dark:text-[#c5c4c4] flex flex-row items-center w-full font-bold justify-between p-4 shadow-sm border-b-[1px] border-[#dfdfdf]">
      <div className=" flex flex-row items-center gap-2">
        <div className="bg-[#868686] rounded-md p-1">
          <GoHash className="bg-white dark:bg-[#868686] text-[#ffff]"/>
        </div>

        <span className="hover:cursor-pointer">{channel?channel.name:"CHANNEL"}</span>
      </div>
      <div className="flex flex-row items-center gap-4">
        <div className="hover:bg-[#e3e3e8] p-1 rounded-md">
          <HiOutlineDotsHorizontal className="hover:cursor-pointer" />
        </div>
        <div className="hover:bg-[#e3e3e8] p-1 rounded-md">
          <RiGeminiLine className="hover:cursor-pointer" />
        </div>
        <div className="hover:bg-[#e3e3e8] p-1 rounded-md group">
          <IoIosInformationCircleOutline className="hover:cursor-pointer" />
          <div className="group-hover:block hidden absolute text-sm text-[#c3c3c3] bg-white p-2 rounded-md shadow-md">
            <p className="">{channel?.description}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Title;
