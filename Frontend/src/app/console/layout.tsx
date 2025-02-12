import React from "react";
import Sidebar from "../components/sidebar/sidebar";
import TeamBar from "../components/teambar/teamBar";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import AddMember from "../components/addMemeber";
import Menu from "../components/expand";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const t1 = await cookies();
  const token = t1.get("token");
  if (!token) {
    redirect("/auth");
  }
  //console.log(token);
  let response;
  try {
    response = await fetch("https://commute-m5tv.onrender.com/user/checkLogin", {
      method: "GET",
      mode: "cors",
      headers: {
        Authorization: JSON.stringify(token),
      },
      credentials: "include",
    });
    // if (response) data = await response.json();
  } catch (e) {
    console.log(e);
  }
  //console.log("status", response?.status, data);
  if (response?.status != 200) redirect("/auth");
  return (
    <div className="flex flex-row text-black dark:text-[#fffff] h-full overflow-hidden z-0 relative">
      <div className="w-[6%] md:block hidden">
        <TeamBar />
      </div>
      <Menu>
        <div className="flex flex-row gap-2 w-full h-full">
          <TeamBar />
          <Sidebar />
        </div>
      </Menu>

      <div className={`bg-white dark:bg-darkBg w-full h-full p-2 md:p-4 md:pl-0 `}>
        <div className="relative bg-[#f3f2f2] dark:bg-innerBg z-0 flex flex-row items-center w-full h-full shadow-xl rounded-xl border-[.4px] border-[#c0bfbf]">
          <div className="hidden w-[20%] md:block h-full rounded-l-xl">
            <Sidebar />
          </div>

          <div className="relative w-full md:w-[55%] h-full flex flex-col items-center border-r-[1px] border-[#dfdfdf]">
            {children}
          </div>
          <div className="w-[25%] md:block h-full hidden">
            <AddMember />
          </div>
        </div>
      </div>
    </div>
  );
}
