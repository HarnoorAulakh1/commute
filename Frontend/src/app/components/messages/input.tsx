"use client";
import { IoMdAttach } from "react-icons/io";
import { useState, useContext, useEffect } from "react";
import { messages } from "@/types";
import { userContext } from "../profile";
import io from "socket.io-client";

function Input({
  set,
}: {
  set: React.Dispatch<React.SetStateAction<messages[]>>;
}) {
  const [state, fileState] = useState<{
    name: string;
    type: string;
    link: string;
  }>({ name: "", type: "", link: "" });
  const { user, dispatch } = useContext(userContext);
  const { socket } = user;
  function handle(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    const msg = data.get("message");
    const message = {
      name: user.username,
      sender_id: user._id,
      team_id: user.c_team,
      channel_id: user.c_channel,
      message: msg as string,
      time: "0",
      file: state,
      image: user.image,
    };
    set((x: messages[]) => {
      if (x && x.length != 0) return [...x, message];
      return [message];
    });
    console.log({...message,file:{type:state.type,link:data.get("upload"),name:state.name}});
    socket?.emit("send_message", {
      team_id: user.c_team,
      channel_id: user.c_channel,
      message: {...message,file:{type:state.type,link:data.get("upload"),name:state.name}},
      image: user.image,
      name: user.username,
    });
    //console.log("state=", state);
    fileState({ name: "", type: "", link: "" });
    form.reset();
  }
  useEffect(() => {
    if (!user.c_team || !user.c_channel) return;
    const socket1 = io("ws://localhost:4000");
    //console.log(user.c_team, user.c_channel);
    dispatch((x) => {
      return { ...x, socket: socket1 };
    });
    socket1.on("initial_data", (data) => {
      //console.log("data=", data);
      if (user.c_team && user.c_channel)
        socket1.emit("join_room", {
          team_id: user.c_team,
          channel_id: user.c_channel,
        });
    });
    socket1.on("receive_message", (data) => {
      //console.log("message=", data);
    });
  }, [user.c_channel, user.c_team]);
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
                  fileState({
                    name: e.target.files[0].name,
                    type: e.target.files[0].type,
                    link: URL.createObjectURL(e.target.files[0]),
                  });
                }
              }}
              name="upload"
              id="upload"
              placeholder="Team Members"
              className="border-2 border-gray-300 rounded-lg p-1 hidden"
            />
            {state.name != "" && (
              <p className="text-[#2c9631] overflow-hidden">
                {state.name} uploaded successfully
              </p>
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
