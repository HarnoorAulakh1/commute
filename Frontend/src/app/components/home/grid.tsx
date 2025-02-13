import React from "react";

export function GridBackgroundDemo({children}:{children:React.ReactNode}) {
  return (
    <div className="h-[50rem] w-full dark:bg-white bg-black  dark:bg-grid-black/[0.2] bg-grid-white/[0.2] relative ">
      {/* Radial gradient for the container to give a faded look */}
      <div className="absolute pointer-events-none inset-0 dark:bg-white bg-black [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"></div>
        {children}
    </div>
  );
}
