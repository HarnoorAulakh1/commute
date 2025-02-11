"use client";
import Image from "next/image";
import { userContext } from "../../components/profile";
import { useContext, useState } from "react";

export default function Tab({
  id,
  img,
  name,
  message,
  team_id,
  unseen,
  type,
}: {
  id: string;
  img: string;
  name: string;
  team_id: string;
  message: string;
  unseen: number;
  type: string;
}) {
  const { user } = useContext(userContext);
  const [state, setState] = useState(true);

  async function handle(choice: number) {
    setState(false);
    if (choice == 1) {
      const response = await fetch(`/api/team/addMember`, {
        method: "POST",
        mode: "cors",
        credentials: "include",
        headers:{
            "Content-Type":"application/json"
        },
        body: JSON.stringify({ team_id,member_id:user._id,notification_id:id }),
      });
      const data = await response.json();
      console.log("hello", data);
    } else {
      console.log("delete=",id);
      const response = await fetch(
        `/api/notification/deleteNotification`,
        {
          method: "DELETE",
          mode: "cors",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ id }),
        }
      );
      const data = await response.json();
      console.log("hello", data);
    }
  }

  return (
    <>
      {state &&
        (type == "invite" ? (
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
              {type != "invite" && (
                <div className="rounded-[1rem] bg-slate-500 px-2">{unseen}</div>
              )}
              <div className="flex flex-row gap-2">
                <button
                  onClick={() => handle(0)}
                  className="rounded-xl bg-[#f3f2f2] py-1 px-2 text-[#52708d] hover:bg-[#e7e7e7] hover:cursor-pointer"
                >
                  Reject
                </button>
                <button
                  onClick={() => handle(1)}
                  className="rounded-xl bg-[#f3f2f2] py-1 px-2 text-[#52708d] hover:bg-[#e7e7e7] hover:cursor-pointer"
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
        ))}
    </>
  );
}
