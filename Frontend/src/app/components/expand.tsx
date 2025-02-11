"use client";
import { useState } from "react";
import { GiCrossMark } from "react-icons/gi";

export default function Menu({ children }: { children: React.ReactNode }) {
  const [state, set] = useState(-1);
  return (
    <div
      className={`md:hidden flex flex-row fixed ${
        state != -1 ? "pl-0 p-2" : "p-0"
      } border-r-[2px] border-[#8e8e8e] w-max try1 h-full z-[9999]`}
    >
      <div
        className={`${
          state != -1 ? "w-[18rem]" : "w-0"
        } overflow-hidden transition-all duration-100 ease-linear`}
      >
        {state == 1 && children }
      </div>
      <div className="my-auto h-full p-1">
        {state != -1 ? (
          <GiCrossMark onClick={() => set(-1)} className="h-full " />
        ) : (
          <div className="flex flex-col h-full w-[1.5rem]">
            <button
              className="h-full font-bold underline border-[1px] border-[#8e8e8e]"
              onClick={() => set(1)}
            >
              <p className="-rotate-90">Panel</p>
            </button>
            <button
              className="h-full font-bold underline border-[1px] border-[#8e8e8e]"
              onClick={() => set(2)}
            >
              <p className="-rotate-90">Add_Member</p>
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
