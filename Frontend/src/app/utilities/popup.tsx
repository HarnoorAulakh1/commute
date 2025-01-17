"use client";
import { useState } from "react";
function Popup({
  children,
  trigger,
}: {
  children: React.ReactNode;
  trigger: React.ReactNode;
}) {
  const [state, setState] = useState(false);
  return (
    <div>
      <div onClick={() => setState((x) => !x)}>{trigger}</div>
      {state && (
        <div
          className="fixed z-[100] border-r-[1px] border-[#dfdfdf] top-0 left-0 w-full h-full backdrop-blur-sm flex justify-center items-center"
        >
            <div className="w-full h-full" onClick={() => setState((x) => !x)}></div>
          <div className="bg-white absolute w-max h-max p-4 rounded-lg  border-[2px] shadow-2xl border-[#dfdfdf]">
            {children}
          </div>
        </div>
      )}
    </div>
  );
}

export default Popup;
