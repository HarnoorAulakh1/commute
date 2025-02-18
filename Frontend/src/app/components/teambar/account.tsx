"use client";
import React, { useContext } from "react";
import Menu from "../menu";
import DarkMode from "./darkMode";
import { FiLogOut } from "react-icons/fi";
import { IoSettingsOutline } from "react-icons/io5";
import { userContext } from "../profile";
import { Avatar1 } from "../addMemeber";
import { useRouter } from "next/navigation";

function Account() {
  const { user } = useContext(userContext);
  const router = useRouter();
  async function handle() {
    const response = await fetch("/api/user/logout", {
      method: "POST",
      mode: "cors",
      credentials: "include",
    });
    if (response.status === 200) router.push("/auth");
  }
  return (
    <Menu
      trigger={
        <div className="rounded-md border-[1px] border-black right-[1.7rem] overflow-hidden">
          <Avatar1 src={user.image} username={user.username} h={60} w={60} />
        </div>
      }
    >
      <div className="flex flex-col p-1 py-4 gap-2 rounded-md fixed bottom-12 left-12 dark:bg-[#787777] bg-[#ffff] ">
        <Tab text="Preferences">
          <IoSettingsOutline />
        </Tab>
        <DarkMode/>
        <div onClick={handle}>
          <Tab text="Logout">
            <FiLogOut />
          </Tab>
        </div>
      </div>
    </Menu>
  );
}

export function Tab({ children, text }: { children: React.ReactNode; text: string }) {
  return (
    <div className="flex flex-row hover:bg-[#ebeced] dark:hover:bg-[#585858] z-[9999] items-center gap-2 pr-8 pl-2 rounded-lg hover:cursor-pointer">
      <div className="text-[1.2rem] text-[#908f9e] dark:text-[#ffff]">{children}</div>
      <h1 className="text-sm text-[#737373] dark:text-[#ffff]">{text}</h1>
    </div>
  );
}

export default Account;
