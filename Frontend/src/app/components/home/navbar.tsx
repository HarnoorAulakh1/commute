"use client";

import Navlink from "./navlink";
import Link from "next/link";

function Navbar() {
  return (
    <>
    
      <div className="w-full z-[999] hidden md:flex justify-center items-center pt-5 text-[#d4d4d4] fixed">
        <div className="flex flex-row justify-between w-[80%] px-2 rounded-xl bg-transparent bg-opacity-50 backdrop-blur-md p-2">
          <div className="flex flex-row justify-center rounded-xl items-center gap-4 font-extralight text-sm">
            <Navlink href="/" value="View" />
            <Navlink href="/console/dashboard" value="Pricing" />
            <Navlink href="/blogs" value="blogs" />
            <Navlink href="/contact" value="contact" />
          </div>

          <div className="flex flex-row justify-center items-center gap-2 rounded-xl">
            <Link href="/auth">
              <button className="hover:bg-[#222222] px-4 py-2 rounded-3xl transition ease-linear duration-150">
                Login
              </button>
            </Link>
            <Link href="/auth">
              <div className="bg-[#6b6b6b] rounded-[1rem] py-[0.05rem] flex justify-center items-center">
                <button className="hover:bg-[#000000e6] bg-[#171717] px-3 py-1 rounded-[2.2rem] transition ease-linear duration-150">
                  Sign Up
                </button>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}

export default Navbar;
