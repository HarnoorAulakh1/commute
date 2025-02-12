"use client";
import { MdOutlineDarkMode } from "react-icons/md";
import { Tab } from "./account";
import { userContext } from "../profile";
import { useContext, useEffect } from "react";

export default function DrakMode() {
  const { user, dispatch } = useContext(userContext);
  console.log(user.darkMode);
  useEffect(() => {
    if (user.darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [user.darkMode]);
  return (
    <div
      onClick={() =>
        dispatch((x) => {
          return { ...x, darkMode: !x.darkMode };
        })
      }
    >
      <Tab text="Dark Mode">
        <MdOutlineDarkMode />
      </Tab>
    </div>
  );
}
