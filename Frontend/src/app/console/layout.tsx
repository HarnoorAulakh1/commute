import React from "react";
import Sidebar from "../components/sidebar";
import TeamBar from "../components/teambar/teamBar";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
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
  let response,data;
  try {
    response = await fetch("http://localhost:8000/user/checkLogin", {
      method: "GET",
      mode: "cors",
      headers: {
        Authorization: JSON.stringify(token),
      },
      credentials: "include",
    });
    if(response)
    data = await response.json();
  } catch (e) {
    console.log(e.message);
  }
  console.log("status",response?.status,data);
  if (response?.status!=200) redirect("/auth");
  return (
    <div className="flex flex-row h-full">
      <TeamBar />
      <div className="try1 w-full h-full p-4 pl-0">
        <div className="bg-[#f3f2f2] flex flex-row items-center w-full h-full rounded-xl shadow-xl border-[.4px] border-[#c0bfbf]">
          <Sidebar />
          {children}
        </div>
      </div>
    </div>
  );
}
