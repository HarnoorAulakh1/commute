"use client";
import React, { useEffect, useRef, useState } from "react";
import Message from "../../components/messages/message";
import Input from "@/app/components/messages/input";
import { messages } from "@/types";
import { useContext } from "react";
import { userContext } from "@/app/components/profile";
import io from "socket.io-client";

export default function Scroll() {
  const ref = useRef<HTMLDivElement>(null);
  const { user, dispatch } = useContext(userContext);
  const [messages, setMessages] = useState<messages[]>([]);
  useEffect(() => {
    if (ref.current) {
      ref.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, [messages]);
  useEffect(() => {
    const handle = async () => {
      const response = await fetch("/api/message/getMessages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          team_id: user.c_team,
          channel_id: user.c_channel,
        }),
        credentials: "include",
      });
      const data = await response.json();
      if (response.status === 200) {
        setMessages(data);
      } else {
        setMessages([
          {
            team_id: "",
            channel_id: "",
            sender_id: "",
            message: "Welcome to commute",
            name: "ChatBot",
            image: "/fire.png",
            file: { type: "", link: "", name: "" },
          },
        ]);
        console.log("Error in fetching messages");
      }
    };
    handle();
    const socket1 = io("ws://commute-m5tv.onrender.com");
    socket1.on("initial_data", () => {
      //console.log("data=", data);
      if (user.c_team)
        socket1.emit("join_room", {
          team_id: user.c_team,
          channel_id: user.c_channel,
        });
    });
    dispatch((x) => {
      return { ...x, socket: socket1 };
    });
    socket1.on("receive_message", (data: messages) => {
      console.log("data=", data);
      setMessages((x: messages[]) => {
        if (x && x.length != 0) return [...x, data];
        return [data];
      });
    });
    return () => {
      socket1.disconnect();
    };
  }, [user.c_team, user.c_channel,dispatch]);
  return (
    <div className="scroll1 w-full flex flex-col scroll1 gap-8 items-start p-4 overflow-scroll overflow-x-hidden">
      {messages.map((x, i) => (
        <Message
          time={x.created_at}
          user_id={user._id}
          channel_id={x.channel_id}
          team_id={x.team_id}
          sender_id={x.sender_id}
          image={x.image}
          name={x.name}
          message={x.message}
          file={{ type: x.file.type, link: x.file.link, name: x.file.name }}
          key={i}
        />
      ))}

      <div ref={ref} className="opacity-0 pb-10">
        <Message
          user_id={user._id}
          channel_id="212121"
          team_id="2121212"
          sender_id="21212"
          image="/file.jpeg"
          name="John Doe"
          time={new Date()}
          message=""
          file={{ type: "", link: "", name: "" }}
          key={"21o"}
        />
      </div>
      <div className="w-full flex justify-center">
        <Input set={setMessages} />
      </div>
    </div>
  );
}
