"use client";
import { useContext, useState } from "react";
import { userContext } from "./profile";

export default function AddChannel() {
  const [state, fileState] = useState("");
  const { user } = useContext(userContext);
  async function handle(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    data.append("creater_id", user._id);
    if (data.get("name") === "" || data.get("description") === "") {
      alert("Please fill all the fields");
      return;
    }
    if (user.c_team) data.append("team_id", user.c_team);
    const response = await fetch("/api/channel/createChannel", {
      method: "POST",
      mode: "cors",
      credentials: "include",
      body: data,
    });
    const res = await response.json();
    console.log("hello", res);
      alert(res.message);
  }
  return (
    <div className="md:px-8 py-1 md:w-[35rem] ">
      <h1 className="font-bold text-3xl text-black">Create new Channel</h1>{" "}
      <form
        onSubmit={handle}
        className="flex flex-col gap-2 text-[1rem] mt-5"
      >
        <div className="flex flex-row gap-2 items-start justify-between">
          <label className="font-semibold text-lg">Channel Name:</label>
          <input
            type="text"
            name="name"
            placeholder="Team Name"
            className="border-2 border-gray-300 rounded-lg p-1"
          />
        </div>
        <div className="flex flex-row gap-2 items-start justify-between">
          <label className="font-semibold text-lg">Channel Description:</label>
          <textarea
            name="description"
            placeholder="Team Description"
            className="border-2 border-gray-300 rounded-lg p-1"
          />
        </div>
        <div className="flex flex-col gap-1 items-center justify-between">
          <label
            htmlFor="upload"
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
            id="upload"
            placeholder="Team Members"
            className="border-2 border-gray-300 rounded-lg p-1 hidden"
          />
          {state && (
            <p className="text-[#2c9631]">{state} uploaded successfully</p>
          )}
        </div>
        <div className="flex flex-row gap-2 items-center justify-center">
          <button
            type="submit"
            className="bg-[#1e90ff] text-white p-1 rounded-lg w-[10rem] hover:cursor-pointer"
          >
            Add Channel
          </button>
        </div>
      </form>
    </div>
  );
}
