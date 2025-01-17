import React from "react";
import Link from "next/link";

function Tab({
  children,
  href,
  text,
}: {
  children: React.ReactNode;
  href: string;
  text: string;
}) {
  return (
    <Link
      href={href}
      className="flex flex-row hover:bg-[#ebeced] items-center gap-2 pr-8 pl-2 rounded-lg hover:cursor-pointer"
    >
      <div className="text-[1.2rem] text-[#908f9e]">{children}</div>
      <h1 className="text-sm text-[#737373]">{text}</h1>
    </Link>
  );
}

export default Tab;