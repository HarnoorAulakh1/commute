"use client";
import Link from "next/link";
import { useContext } from "react";
import { userContext } from "../profile";

export default function Icon({
  children,
  href,
  id
}: {
  children: React.ReactNode;
  href: string;
  id?:string
}) {
  const { user, dispatch } = useContext(userContext);
  const handle = () => {
    if(id)
    dispatch({ ...user, c_team: id });
    console.log("team", id);
  };
  return (
    <Link onClick={handle} href={href} className="w-full">
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
