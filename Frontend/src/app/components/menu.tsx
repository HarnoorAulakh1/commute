"use client";
import { useState } from "react";

function Menu({
  children,
  trigger,
}: {
  children: React.ReactNode;
  trigger: React.ReactNode;
}) {
  const [state, set] = useState(false);
  return (
    <div className="w-max hover:cursor-pointer">
      <div onClick={() => set((x) => !x)}>{trigger}</div>
      {state && (
        <>
          <div
            className="w-full h-full fixed top-0 left-0 z-[99]"
            onClick={() => set((x) => !x)}
          ></div>
          <div className="relative z-[999] ">{children}</div>
        </>
      )}
    </div>
  );
}

export default Menu;
