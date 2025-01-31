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
    team:string;
    channel:string;
    c_team:string;
    c_channel:string;
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
      team:string;
      channel:string;
      c_team:string;
      c_channel:string;
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
    origin:"",
    team:"",
    channel:"",
    c_team:"",
    c_channel:""
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
    team:string;
    channel:string;
    c_channel:string;
    c_team:string;
  }>({
    _id: "",
    username: "",
    email: "",
    firstName: "",
    lastName: "",
    status: "",
    origin:"",
    team:"",
    channel:"",
    c_channel:"",
    c_team:""
  });

  useEffect(() => {
    const fetchUser = async () => {
      const response = await fetch(`/api/user/checkLogin`, {
        method: "GET",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });
      const data=await response.json()
      //console.log("user=",data);
      dispatch(data);
    };
    fetchUser();
  }, []);

  return (
    <userContext.Provider value={{ user, dispatch }}>
      {children}
    </userContext.Provider>
  );
}
