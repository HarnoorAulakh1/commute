"use client";
import { IoMdAttach } from "react-icons/io";
import { useState } from "react";

function Input() {
  const [state, fileState] = useState<string | null>(null);
  function handle(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    const message = data.get("message");
    console.log(message);
    console.log(data.get("upload"));
    fileState("");
    form.reset();
  }
  return (
    <div className="bg-white w-[75%] h-[9rem] rounded-xl overflow-hidden p-3 pr-[1px] pt-1 flex flex-col  gap-1 absolute bottom-[2%] outline-none">
      <form onSubmit={handle}>
        <textarea
          placeholder="Type a message"
          name="message"
          className="bg-white text-[#403e54] w-full pr-3 pt-3 h-[6rem]  text-md outline-none resize-none"
        />
        <div className="flex flex-row items-start justify-between">
          <div className="flex flex-row gap-1 items-start">
            <label htmlFor="upload">
              <IoMdAttach className="text-2xl hover:cursor-pointer" />
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
              <p className="text-[#2c9631] overflow-hidden">{state} uploaded successfully</p>
            )}
          </div>
          <div className="flex flex-row gap-4 justify-end font-bold pr-3">
            <button
              type="reset"
              className="bg-[#e7e6e6] p-1 px-2 rounded-md w-[5rem] hover:cursor-pointer transition-all duration-500 hover:rounded-3xl"
            >
              Discard
            </button>
            <button
              type="submit"
              className="bg-black text-white p-1 px-2 rounded-md w-[5rem] hover:cursor-pointer transition-all duration-500 hover:rounded-3xl"
            >
              Send
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default Input;
