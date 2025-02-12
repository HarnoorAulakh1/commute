"use client";
import React from "react";
import { IoAdd } from "react-icons/io5";
import { FiMinus } from "react-icons/fi";
import { useState } from "react";

function List({
  heading,
  children,
}: {
  heading: string;
  children: React.ReactNode;
}) {
  const [state, setState] = useState(true);
  return (
    <div className="flex flex-col p-2 gap-2">
      <div className="flex flex-row justify-between">
        <h1 className="text-md text-[#403e54] dark:text-[#ffff]">{heading}</h1>
        <div onClick={() => setState((x) => !x)}>
          {!state ? <IoAdd /> : <FiMinus />}
        </div>
      </div>
      {state && children}
    </div>
  );
}


export default List;
