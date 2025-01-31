"use client";
import Image from "next/image";
import { userContext } from "../../components/profile";
import { useContext } from "react";

export default function Tab({
    id,
  img,
  name,
  message,
  unseen,
  type,
}: {
    id:string,
  img: string;
  name: string;
  message: string;
  unseen: number;
  type: string;
}) {
  const { user } = useContext(userContext);
  //console.log("user",user.c_team);

  async function handle(choice: number) {
    if (choice == 1) {
      const response = await fetch(`http://localhost:8000/team/addMember`, {
        method: "POST",
        mode: "cors",
        credentials: "include",
        body: JSON.stringify({ team_id: user.c_team }),
      });
      const data = await response.json();
      console.log("hello", data);
    } else {
      const response = await fetch(`http://localhost:8000/notification/deleteNotification`, {
        method: "POST",
        mode: "cors",
        credentials: "include",
        body: JSON.stringify({id }),
      });
      const data = await response.json();
      console.log("hello", data);
    }
  }

  return (
    <>
      {type == "invite" ? (
        <div className="flex flex-row pl-5 items-center gap-5 text-white w-[85%] transition-all duratio-150 rounded-xl p-2 hover:w-[80%] bg-[#52708d] hover:cursor-pointer">
          <div className="rounded-[5rem] w-max h-max overflow-hidden">
            <Image
              src={img}
              height={40}
              width={40}
              alt="Dummy Image"
              className="rounded-full aspect-square object-cover"
            />
          </div>
          <div className="flex flex-row justify-between items-center w-full pr-5">
            <div className="flex flex-col ">
              <p>{name}</p>
              <p className="text-sm text-[#d4d2d7]">{message}</p>
            </div>
            <div className="rounded-[1rem] bg-slate-500 px-2">{unseen}</div>
            <div>
              <button
                onClick={()=>handle(0)}
                className="rounded-xl bg-[#f3f2f2] p-2 text-[#52708d] hover:bg-[#e7e7e7] hover:cursor-pointer"
              >
                Reject
              </button>
              <button
                onClick={()=>handle(1)}
                className="rounded-xl bg-[#f3f2f2] p-2 text-[#52708d] hover:bg-[#e7e7e7] hover:cursor-pointer"
              >
                Accept
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex flex-row pl-5 items-center gap-5 text-white w-[85%] transition-all duratio-150 rounded-xl p-2 hover:w-[80%] bg-[#52708d] hover:cursor-pointer">
          <div className="rounded-[5rem] w-max h-max overflow-hidden">
            <Image
              src={img}
              height={40}
              width={40}
              alt="Dummy Image"
              className="rounded-full aspect-square object-cover"
            />
          </div>
          <div className="flex flex-row justify-between items-center w-full pr-5">
            <div className="flex flex-col ">
              <p>{name}</p>
              <p className="text-sm text-[#d4d2d7]">{message}</p>
            </div>
            <div className="rounded-[1rem] bg-slate-500 px-2">{unseen}</div>
          </div>
        </div>
      )}
    </>
  );
}
