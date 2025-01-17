"use client";

import React, { createContext, useState, useEffect } from "react";
export const userContext = createContext<{
  user: {
    _id: string;
    username: string;
    email: string;
    firstName: string;
    lastName: string;
    status: string;
    origin:string;
  };
  dispatch: React.Dispatch<
    React.SetStateAction<{
      _id: string;
      username: string;
      email: string;
      firstName: string;
      lastName: string;
      status: string;
      origin:string;
    }>
  >;
}>({
  user: {
    _id: "",
    username: "",
    email: "",
    firstName: "",
    lastName: "",
    status: "",
    origin:""
  },
  dispatch: () => {},
});

export default function Profile({ children }: { children: React.ReactNode }) {
  const [user, dispatch] = useState<{
    _id: string;
    username: string;
    email: string;
    firstName: string;
    lastName: string;
    status: string;
    origin:string;
  }>({
    _id: "",
    username: "",
    email: "",
    firstName: "",
    lastName: "",
    status: "",
    origin:""
  });

  useEffect(() => {
    const fetchUser = async () => {
      const data = await fetch(`/api/user/checkLogin`, {
        method: "GET",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });
      dispatch(await data.json());
    };
    fetchUser();
  }, []);

  return (
    <userContext.Provider value={{ user, dispatch }}>
      {children}
    </userContext.Provider>
  );
}
