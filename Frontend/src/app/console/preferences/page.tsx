"use client";
import Title from "../../components/messages/title";
import { useState } from "react";

export default function Preferences() {
    //const [members, setMembers] = useState(["kartik", "shubham","lichi","rahul"]);
  const [state, fileState] = useState("");
  function handle(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    console.log(data.get("name"), data.get("email"), data.get("description"));
  }
  return (
    <div className="w-[100%] h-full flex flex-col overflow-hidden items-center border-r-[1px] border-[#dfdfdf]">
<Title  title="Preferences"/>
    <div className=" h-full gap-4 outline-none p-5">
      <form className="flex flex-col gap-5" onSubmit={(e) => handle(e)}>
        <h1 className="font-bold">
          1. <span className="underline">General</span>
        </h1>
        <div className="flex flex-wrap gap-[2rem] pl-8">
          <div className="flex flex-col gap-1">
            <h1 className="text-md">Name</h1>
            <input
              type="text"
              name="name"
              placeholder="Name"
              className="border-2 w-[18rem] focus:border-[#3b82f6] rounded-lg px-2 py-1"
            />
          </div>
          <div>
            <h1 className="text-md">Discription</h1>
            <textarea
              name="description"
              placeholder="Discription"
              className="border-2 w-[18rem] focus:border-[#3b82f6] rounded-lg px-2 py-1"
            />
          </div>
          <div className="flex flex-col gap-1 items-center justify-between">
            <label
              htmlFor="logo"
              className="font-semiboldw-max text-lg bg-[#908f9e] text-white p-1 px-2 rounded-md hover:cursor-pointer"
            >
              upload logo
            </label>
            <input
              type="file"
              onChange={(e) => {
                if (e.target.files && e.target.files.length > 0) {
                  fileState(e.target.files[0].name);
                }
              }}
              name="logo"
              id="logo"
              placeholder="Team Members"
              className="border-2 border-gray-300 rounded-lg p-1 hidden"
            />
            {state && (
              <p className="text-[#2c9631]">{state} uploaded successfully</p>
            )}
          </div>
        </div>
        <h1 className="font-bold">
          2. <span className="underline">Advanced</span>
        </h1>
        <div className="flex flex-wrap gap-[2rem] pl-8">
          <div className="flex flex-col gap-1">
            <h1 className="text-md">Email</h1>
            <input
              type="email"
              name="email"
              placeholder="Email"
              className="border-2 w-[18rem] focus:border-[#3b82f6] rounded-lg px-2 py-1"
            />
          </div>
          <div>
            <h1 className="text-md">Phone</h1>
            <input
              type="tel"
              name="phone"
              placeholder="Phone"
              className="border-2 w-[18rem] focus:border-[#3b82f6] rounded-lg px-2 py-1"
            />
          </div>
          </div>
        <button
          type="submit"
          className="bg-[#3b82f6] text-white px-4 py-2 rounded-lg"
        >
          Save
        </button>
      </form>
    </div>
    </div>
  );
}
