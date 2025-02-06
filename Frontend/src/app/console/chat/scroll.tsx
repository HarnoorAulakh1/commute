"use client";
import React, { useEffect, useRef, useState } from "react";
import Message from "../../components/messages/message";
import Input from "@/app/components/messages/input";
import { messages } from "@/types";
import { useContext } from "react";
import { userContext } from "@/app/components/profile";

export default function Scroll({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const { user } = useContext(userContext);
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
      if (response.status === 200) setMessages(data);
      else console.log("Error in fetching messages");
    };
    handle();
  }, [user.c_team, user.c_channel,messages]);
  return (
    <div className="scroll1 flex flex-col scroll1 gap-8 items-start p-4 overflow-scroll overflow-x-hidden">
      {children}
      {messages.map((x, i) => (
        <Message
          user_id={user._id}
          channel_id={x.channel_id}
          team_id={x.team_id}
          sender_id={x.sender_id}
          image={x.image}
          name={x.name}
          time="2"
          message={x.message}
          file={{ type: x.file.type, link: x.file.link, name: x.file.name }}
          key={i}
        />
      ))}

      <div ref={ref} className="opacity-0 pb-10">
        <Message
          channel_id="212121"
          team_id="2121212"
          sender_id="21212"
          image="/file.jpeg"
          name="John Doe"
          time="2"
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
