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
import Icon from "./teams";

async function TeamBar() {
  const cookies1 = await cookies();
  const teams = await fetch("https://commute-m5tv.onrender.com/team/getTeams", {
    method: "GET",
    mode: "cors",
    headers: {
      Authorization: JSON.stringify(cookies1.get("token")),
    },
    credentials: "include",
  });
  const { array: arr } = await teams.json();
  //const arr=teams1.array;
  //console.log("teams=",arr );
  return (
    <div className="bg-white dark:bg-darkBg h-full w-[5rem] md:w-full flex flex-col justify-between overflow-hidden">
      <div className="w-full text-[2.5rem] h-[100%] flex flex-col items-center gap-2 pt-10">
        <Icon i={-1}>
          <AiFillSkype />
        </Icon>
        <Icon i={-1}>
          <AiFillTwitterCircle />
        </Icon>
        <Icon i={-1}>
          <AiFillPropertySafety />
        </Icon>
        {arr &&
          arr.map((team: team & { _id: string }, i: number) => (
            <Icon id={team._id} i={i} key={team.name}>
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
            <div
              className={`flex flex-row items-center relative gap-2 hover:cursor-pointer`}
            >
              <div className={`p-1 bg-[#ffff] rounded-lg`}>
                <FaPlus className=" rounded-xl" />
              </div>
            </div>
          }
        >
          <AddTeam />
        </Popup>
      </div>
      <div className="mx-2 mb-5">
        <Account />
      </div>
    </div>
  );
}

export default TeamBar;
