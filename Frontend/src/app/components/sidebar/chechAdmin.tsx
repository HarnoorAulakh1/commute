"use client";
import { useState, useEffect, useContext } from "react";
import { userContext } from "../profile";

export function CheckAdmin({ children }: { children: React.ReactNode }) {
  const { user } = useContext(userContext);
  const [admin, setAdmin] = useState(false);
  useEffect(() => {
    async function handle() {
      const response = await fetch(
        `/api/team/checkAdmin?id=${user._id}&team_id=${user.c_team}`,
        {
          method: "GET",
          mode: "cors",
          credentials: "include",
        }
      );
      const data = await response.json();
      setAdmin(data.admin);
    }
    handle();
  }, [user.c_team, user._id]);
  return <div>{admin && children}</div>;
}
