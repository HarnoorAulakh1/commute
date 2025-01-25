"use client";
import { useEffect } from "react";
import { useState } from "react";
import Image from "next/image";
import { createAvatar } from "@dicebear/core";
import { identicon } from "@dicebear/collection";
import { userInterface } from "@/types";

export default function AddMember() {
  const [profile, show] = useState(false);
  const [user, setUser] = useState<userInterface>();
  const [users, setUsers] = useState([]);
  const [username, setUsername] = useState("");
  useEffect(() => {
    async function handle() {
      const response = await fetch(
        `http://localhost:8000/user/getUsers?username=${username}`,
        {
          method: "GET",
          mode: "cors",
          credentials: "include",
        }
      );
      const data = await response.json();
      if (response.status === 200) setUsers(data);
      console.log("users", users);
    }
    handle();
  }, [username]);
  return (
    <div className="w-[25%] h-full flex flex-col items-center gap-2">
      <Title title="Add Member" />
      <form>
        <input
          onChange={(e) => {
            show(false);
            setUsername(e.target.value);
          }}
          type="text"
          name="username"
          placeholder="search members"
          className="rounded-md px-2"
        />
      </form>
      {profile ? (
        <>{user && <Profile user={user} />}</>
      ) : (
        <div className="w-full h-full flex flex-col gap-2">
          {users.map((user: userInterface & { _id: string }) => (
            <div
              onClick={() => {
                show(true);
                setUser(user);
              }}
              className="flex flex-row items-center gap-4 px-5 hover:cursor-pointer hover:bg-[#e7e7e7]"
              key={user._id}
            >
              <Avatar src={user.image} username={user.username}/>
              <span>{user.username}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function Avatar({
  src,
  username,
  w,
  h,
}: {
  src: string;
  username: string;
  w?: number;
  h?: number;
}) {
  const avatar = createAvatar(identicon, {
    seed: username,
  });
  const svg = avatar.toString();
  console.log(src, src != "NULL" && src != "undefined");
  return (
    <div className=" rounded-md py-1">
      {src != "NULL" && src ? (
        <Image
          src={src}
          width={w || 35}
          height={h || 35}
          alt=""
          className="rounded-lg"
        />
      ) : (
        <div dangerouslySetInnerHTML={{ __html: svg }} className="w-[2rem]" />
      )}
    </div>
  );
}

function Title({ title }: { title: string }) {
  return (
    <div className="text-[#76747f] flex flex-row items-center shadow-sm w-full font-bold justify-between p-4  border-b-[1px] border-[#dfdfdf]">
      <div className="text-[#76747f] flex flex-row items-center w-full h-full font-bold justify-between  ">
        <div className=" flex flex-row items-center gap-2">
          <span className="hover:cursor-pointer">{title}</span>
        </div>
      </div>
    </div>
  );
}

function Profile({ user }: { user: userInterface }) {
  console.log("user=", user);
  return (
    <div className="w-full h-full flex flex-col items-center gap-2">
      <Title title="Profile" />
      <div className="w-full h-full flex flex-col gap-2">
        <div className="flex flex-col items-center gap-4 px-5">
          <Avatar src={user.image} username={user.username} h={120} w={120} />
          <span>{user.username}</span>
          <span>
            {user.firstName} {user.lastName}
          </span>
        </div>
      </div>
    </div>
  );
}
