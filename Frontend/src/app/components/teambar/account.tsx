import React from "react";
import Menu from "../menu";
import { MdOutlineDarkMode } from "react-icons/md";
import { FiLogOut } from "react-icons/fi";
import { IoSettingsOutline } from "react-icons/io5";
import Tab from "../../utilities/tab";
import { cookies } from "next/headers";
import { Avatar } from "../addMemeber";

async function Account() {
  const cookies1 = await cookies();
    const response = await fetch("http://localhost:8000/user/checkLogin", {
      method: "GET",
      mode: "cors",
      headers: {
        Authorization: JSON.stringify(cookies1.get("token")),
      },
      credentials: "include",
    });
    const user = await response.json();
  return (
    <Menu
      trigger={
        <div className="rounded-md border-[1px] border-black right-[1.7rem] overflow-hidden">
          <Avatar src={user.image} username={user.username} h={60} w={60}/>
        </div>
      }
    >
      <div className="flex flex-col p-1 py-4 gap-2 rounded-md fixed bottom-12 left-12 bg-white">
        <Tab href="/" text="Preferences">
          <IoSettingsOutline />
        </Tab>
        <Tab href="/" text="Dark Mode">
          <MdOutlineDarkMode />
        </Tab>
        <Tab href="/" text="Logout">
          <FiLogOut />
        </Tab>
      </div>
    </Menu>
  );
}

export default Account;
