"use client";
import List from "../list";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useContext, useState } from "react";
import { userContext } from "../profile";
import { useRouter } from "next/navigation";

function Channels() {
  const [channels, setChannels] = useState([]);
  const { user ,dispatch} = useContext(userContext);
  const router = useRouter();
  //console.log("id", id);
  useEffect(() => {
    async function handle() {
      if (!user.c_team) return;
      const response = await fetch(
        `/api/channel/getChannels?team_id=${user.c_team}`,
        {
          method: "GET",
          mode: "cors",
          credentials: "include",
        }
      );
      const data = await response.json();
      if (response.status === 200) {
        setChannels(data);
        //console.log("data=", user.c_channel);
        if (!user.c_channel){
          dispatch((x) => {
            return { ...x, c_channel: data[0]._id };
          });
          router.push("/console/chat");
        }
      } else {
        alert("Failed to fetch channels");
      }
    }
    handle();
  }, [user.c_team,dispatch,router,user.c_channel]);
  return (
    <List heading="Channels">
      <div className="flex flex-col gap-2 pl-2">
        {channels.map(
          (channel: { name: string; _id: string; logo: string }, i) => (
            <Tab2
              href={`/console/chat`}
              i={i}
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
        <Tab2 i={-1} href="/console/chat" text="General" key={-1} id="">
          <Image alt="fire" src="/fire.png" width={20} height={20} />
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
  i: number;
}) {
  const { dispatch } = useContext(userContext);
  const router = useRouter();
  return (
    <div
      onClick={() => {
        dispatch((x) => {
          return { ...x, c_channel: id };
        });
        router.push("/console/chat");
      }}
      className="hover:cursor-pointer"
    >
      <Link
        href={href}
        className="flex flex-row hover:bg-[#ebeced] dark:hover:bg-[#636363] items-center gap-2 pl-2 rounded-lg hover:cursor-pointer"
      >
        <div className="text-xl">{children}</div>
        <h1 className="text-sm text-[#908f9e] dark:text-[#c0c0c0]">{text}</h1>
      </Link>
    </div>
  );
}
