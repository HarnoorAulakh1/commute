import Link from "next/link";
import React from "react";
import { AiFillSkype } from "react-icons/ai";
import { AiFillTwitterCircle } from "react-icons/ai";
import { AiFillPropertySafety } from "react-icons/ai";
import { FaPlus } from "react-icons/fa6";
import Popup from "../../utilities/popup";
import AddTeam from "./add";
import Account from "./account";
import { cookies } from "next/headers";
import Image from "next/image";
import { team } from "../../../types";

async function TeamBar() {
  const cookies1 = await cookies();
  const teams = await fetch("http://localhost:8000/team/getTeams", {
    method: "GET",
    mode: "cors",
    headers: {
      Authorization: JSON.stringify(cookies1.get("token")),
    },
    credentials: "include",
  });
  const { teams: teams1 } = await teams.json();
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
        {teams1 &&
          teams1.map((team: team & { _id: string }) => (
            <Icon href={`/console?id1=${team._id}`} key={team.name}>
              <Image
                src={team.logo}
                width={40}
                height={40}
                alt=""
                className="w-[2rem] h-[2rem] rounded-lg"
              />
            </Icon>
          ))}
        <Popup
          trigger={
            <div className={`flex flex-row items-center relative gap-2 hover:cursor-pointer`}>
              <div className={`p-1 bg-white rounded-lg`}>
                <FaPlus />
              </div>
            </div>
          }
        >
          <AddTeam />
        </Popup>
      </div>
      <div className="mx-2 mb-5">
        {" "}
        <Account img="/img1.jpeg" />
      </div>
    </div>
  );
}

function Icon({ children, href }: { children: React.ReactNode; href: string }) {
  return (
    <Link href={href} className="w-full">
      <div className={`flex flex-row items-center relative gap-2`}>
        <div
          className={`w-[.3rem] h-[2.5rem] ${
            href == "/" ? "bg-black" : ""
          } rounded-r-lg`}
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
