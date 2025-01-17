import React from "react";
import Image from "next/image";
import Menu from "../menu";
import { MdOutlineDarkMode } from "react-icons/md";
import { FiLogOut } from "react-icons/fi";
import { IoSettingsOutline } from "react-icons/io5";
import Tab from "../../utilities/tab";

function Account({ img }: { img: string }) {
  return (
    <Menu
      trigger={
        <div className="rounded-full right-[1.7rem]">
          <Image
            src={img}
            height={50}
            width={50}
            alt="Dummy Image"
            className="rounded-full aspect-square object-cover hover:cursor-pointer"
          />
        </div>
      }
    >
      <div className="flex flex-col p-1 py-4 gap-2 absolute left-[2rem] top-[-5rem] rounded-md bg-white">
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
