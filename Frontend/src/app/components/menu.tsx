"use client";
import { useState } from "react";

function Menu({ children,trigger }: { children: React.ReactNode,trigger: React.ReactNode }) {
  const [state, set] = useState(false);
  return (
    <div className="relative w-max">
      <div onClick={() => set((x) => !x)} >{trigger}</div>
      {state && children}
    </div>
  );
}



export default Menu;
