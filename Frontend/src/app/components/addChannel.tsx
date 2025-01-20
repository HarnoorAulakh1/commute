"use client";
import { useState } from "react";

export default function AddChannel() {
  const [state, fileState] = useState("");
  function handle(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    const teamName = data.get("name");
    const teamDescription = data.get("description");
    console.log(teamName, teamDescription);
  }
  return (
    <div className="px-8 py-1 ">
      <h1 className="font-bold text-3xl text-black">Create new Team</h1>{" "}
      <form
        onSubmit={handle}
        className="flex flex-col gap-2 text-[1rem] w-[30rem] mt-5"
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
            name="upload"
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
            Add Team
          </button>
        </div>
      </form>
    </div>
  );
}