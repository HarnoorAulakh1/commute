import Link from "next/link";
import React from "react";
import { AiFillSkype } from "react-icons/ai";
import { AiFillTwitterCircle } from "react-icons/ai";
import { AiFillPropertySafety } from "react-icons/ai";
import { FaPlus } from "react-icons/fa6";
import Popup from "../../utilities/popup";
import AddTeam from "./add";
import Account from "./account";

async function TeamBar() {
  return (
    <div className="try w-[6%] flex flex-col justify-between overflow-hidden">
      <div className="w-full text-[2.5rem] h-[100%] flex flex-col items-center gap-2 pt-10">
        <Icon href="/">
          <AiFillSkype />
        </Icon>
        <Icon href="">
          <AiFillTwitterCircle />
        </Icon>
        <Icon href="">
          <AiFillPropertySafety />
        </Icon>
        <Popup
          trigger={
            <Icon href="">
              <FaPlus />
            </Icon>
          }
        >
          <AddTeam />
        </Popup>
      </div>
      <div className="mx-2 mb-5"> <Account img="/img1.jpeg" /></div>
       
    </div>
  );
}

function Icon({ children, href }: { children: React.ReactNode; href: string }) {
  return (
    <Link href={href}>
      <div
        className={`flex flex-row items-center relative right-[1.5rem] gap-2`}
      >
        <div
          className={`w-[2rem] h-[2.2rem] ${
            href == "/" ? "bg-black" : ""
          } rounded-lg`}
        ></div>
        <div
          className={`p-1 ${
            href != "/add" ? "bg-white" : "bg-[#e5e5e5]"
          } rounded-lg`}
        >
          {" "}
          {children}
        </div>
      </div>
    </Link>
  );
}

export default TeamBar;
