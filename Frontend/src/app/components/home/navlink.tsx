"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

function Navlink({ href ,value}: { href: string,value:string }) {
    const router=usePathname();
  return (
    <Link href={href} className={`hover:bg-[#222222] px-3 py-1 ${value=="View" && "font-bold"} ${(router==href && href!="/") && "bg-[#222222]"} rounded-md transition ease-linear duration-100`}>
      {value}
    </Link>
  );
}
export default Navlink;
