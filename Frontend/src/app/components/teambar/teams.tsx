"use client";
import { useContext } from "react";
import { userContext } from "../profile";
import { useEffect } from "react";

export default function Icon({
  children,
  id,
  i,
}: {
  children: React.ReactNode;
  id?: string;
  i: number;
}) {
  const { user, dispatch } = useContext(userContext);
  const handle = async () => {
    const response = await fetch(
      `http://localhost:8000/team/checkAdmin?id=${user._id}&team_id=${id}`,
      {
        method: "GET",
        mode: "cors",
        credentials: "include",
      }
    );
    const data = await response.json();
    if (data.admin && id) dispatch({ ...user, c_team: id, admin: true });
    else if (id) dispatch({ ...user, c_team: id });
  };
  useEffect(() => {
    //console.log("i=", user.c_team);
    if (i == 0 && id && user._id && !user.c_team) {
      handle();
    }
  }, [id, i,user._id,user.c_team]);

  return (
    <div onClick={handle} className="w-full">
      <div className="flex flex-row items-center relative gap-2">
        <div
          className={`w-[.3rem] h-[2.5rem] ${
            id === user.c_team ? "bg-black" : ""
          } rounded-r-lg`}
        ></div>
        <div className={`p-1 ${id ? "bg-white" : "bg-[#e5e5e5]"} rounded-lg`}>
          {children}
        </div>
      </div>
    </div>
  );
}
