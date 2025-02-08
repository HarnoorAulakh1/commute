"use client";
import { useContext } from "react";
import { userContext } from "../profile";

export default function Icon({
  children,
  id,
}: {
  children: React.ReactNode;
  id?: string;
}) {
  const { user, dispatch } = useContext(userContext);
  //console.log("team", id,user.c_team);

  const handle = async() => {
    const response = await fetch("/api/team/checkAdmin", {
      method: "GET",
      mode: "cors",
      credentials: "include",
    });
    const data = await response.json();
    if(data.admin &&  id)
      dispatch({ ...user, c_team: id,admin:true });
    else if(id)
    dispatch({ ...user, c_team: id });
    //console.log("team", id);
  };

  return (
    <div onClick={handle} className="w-full">
      <div className="flex flex-row items-center relative gap-2">
        <div className={`w-[.3rem] h-[2.5rem] ${id ===user.c_team ? "bg-black" : ""} rounded-r-lg`}></div>
        <div className={`p-1 ${id? "bg-white" : "bg-[#e5e5e5]"} rounded-lg`}>
          {children}
        </div>
      </div>
    </div>
  );
}
