"use client";
import React, { useEffect } from "react";
import { FaCaretDown } from "react-icons/fa";
import { useContext, useState } from "react";
import { userContext } from "../profile";

export default function GetTeam() {
  const { user } = useContext(userContext);
  const [team, setTeam] = useState("");
  useEffect(() => {
    const handle = async () => {
      const response = await fetch(
        `http://localhost:8000/team/getTeam?id=${user.c_team}`,
        {
          method: "GET",
          mode: "cors",
          credentials: "include",
        }
      );
      const data = await response.json();
      if (response.status === 200) {
        setTeam(data.name);
      } else {
        console.log("Error in fetching team");
      }
    };
    if (user.c_team) handle();
  }, [user.c_team]);

  return (
    <div className="flex flex-row items-center hover:cursor-pointer">
      <h1 className="font-bold text-2xl ">{team}</h1>
      <FaCaretDown />
    </div>
  );
}
