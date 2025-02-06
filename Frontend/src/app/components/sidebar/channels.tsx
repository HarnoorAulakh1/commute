"use client";
import { MdAssistant } from "react-icons/md";
import List from "../list";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useContext, useState } from "react";
import { userContext } from "../profile";

function Channels() {
  const [channels, setChannels] = useState([]);
  const { user } = useContext(userContext);
  //console.log("id", id);
  useEffect(() => {
    async function handle() {
      if (!user.c_team) return;
      const response = await fetch(
        `http://localhost:8000/channel/getChannels?team_id=${user.c_team}`,
        {
          method: "GET",
          mode: "cors",
          credentials: "include",
        }
      );
      const data = await response.json();
      if (response.status === 200) setChannels(data);
      else alert("Failed to fetch channels");
      console.log("channels", data);
    }
    handle();
  }, [user.c_team]);
  return (
    <List heading="Channels">
      <div className="flex flex-col gap-2 pl-2">
        {channels.map(
          (channel: { name: string; _id: string; logo: string }) => (
            <Tab2
              href={`/console/chat`}
              id={channel._id}
              text={channel.name}
              key={channel._id}
            >
              {channel.logo ? (
                <Image alt="fire" src={channel.logo} width={20} height={20} />
              ) : (
                <div className="bg-black h-[1.2rem] w-[1.2rem] rounded-full"></div>
              )}
            </Tab2>
          )
        )}
        <Tab2 href="/console/chat" text="General">
          <Image alt="fire" src="/fire.png" width={20} height={20} />
        </Tab2>
        <Tab2 href="/console/chat" text="Random">
          <MdAssistant />
        </Tab2>
        <Tab2 href="/console/chat" text="Design">
          <MdAssistant />
        </Tab2>
        <Tab2 href="/console/chat" text="Development">
          <MdAssistant />
        </Tab2>
        <Tab2 href="/console/chat" text="Marketing">
          <MdAssistant />
        </Tab2>
      </div>
    </List>
  );
}

export default Channels;

function Tab2({
  children,
  href,
  text,
  id,
}: {
  children: React.ReactNode;
  href: string;
  text: string;
  id: string;
}) {
  const { dispatch } = useContext(userContext);
  return (
    <div
      onClick={() =>
        dispatch((x) => {
          return { ...x, c_channel: id };
        })
      }
      className="hover:cursor-pointer"
    >
      <Link
        href={href}
        className="flex flex-row hover:bg-[#ebeced] items-center gap-2 pl-2 rounded-lg hover:cursor-pointer"
      >
        <div className="text-xl">{children}</div>
        <h1 className="text-sm text-[#908f9e]">{text}</h1>
      </Link>
    </div>
  );
}
