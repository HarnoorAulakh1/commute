"use client";
import Title from "../../components/messages/title";
import { useState, useEffect } from "react";
import { Avatar } from "../../components/addMemeber";
import { userInterface } from "@/types";
import { useContext } from "react";
import { ImCross } from "react-icons/im";
import { userContext } from "../../components/profile";

export default function Preferences() {
  //const [members, setMembers] = useState(["kartik", "shubham","lichi","rahul"]);
  const [state, fileState] = useState("");
  function handle(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    // const form = e.currentTarget;
    // const data = new FormData(form);
    //console.log(data.get("name"), data.get("email"), data.get("description"));
  }
  return (
    <div className="w-[100%] h-full flex flex-col overflow-hidden items-center border-r-[1px] border-[#dfdfdf]">
      <Title title="Preferences" />
      <div className=" h-full gap-4 outline-none p-5 overflow-scroll overflow-x-hidden">
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
            2. <span className="underline">Manage Members</span>
          </h1>
          <div className="flex flex-wrap gap-[2rem] pl-8">
            <AddMember />
          </div>
          <h1 className="font-bold">
            3. <span className="underline">Manage Admins</span>
          </h1>
          <div className="flex flex-wrap gap-[2rem] pl-8">
            <AddAdmin />
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

function AddMember() {
  const [delUsers, del] = useState<(userInterface & { _id: string })[]>([]);
  const [users, setUsers] = useState([]);
  const [username, setUsername] = useState("");
  const {user}=useContext(userContext);
  useEffect(() => {
    async function handle() {
      const response = await fetch(
        `http://localhost:8000/user/getUsers?username=${username}&team_id=${user.c_team}`,
        {
          method: "GET",
          mode: "cors",
          credentials: "include",
        }
      );
      const data = await response.json();
      if (response.status === 200) setUsers(data);
      console.log("users", delUsers);
    }
    handle();
  }, [username,user.c_team]);
  return (
    <div className="w-full h-full flex flex-col items-center gap-2">
      <div className="flex flex-row gap-10 justify-between px-10 w-full">
        <div className="h-full flex flex-col gap-2">
          <input
            onChange={(e) => {
              setUsername(e.target.value);
            }}
            type="text"
            name="username"
            placeholder="search members"
            className="rounded-md px-2"
          />
          {users.map((user: userInterface & { _id: string }) => (
            <div
              onClick={() => {
                del((x) => {
                  if (x.find((y) => y._id == user._id)) return x;
                  return [...x, user];
                });
              }}
              className="flex flex-row items-center gap-4 px-5 hover:cursor-pointer hover:bg-[#e7e7e7]"
              key={user._id}
            >
              <Avatar src={user.image} username={user.username} />
              <span>{user.username}</span>
            </div>
          ))}
        </div>

        <div className="w-[20rem]">
          <h1>Delete Users:</h1>
          {delUsers.map((user: userInterface & { _id: string }) => (
            <div
              className="flex flex-row items-center gap-4 px-5 hover:bg-[#e7e7e7]"
              key={user._id}
            >
              <Avatar src={user.image} username={user.username} />
              <span>{user.username}</span>
              <ImCross
                onClick={() =>
                  del((x) => x.filter((x1) => x1._id !== user._id))
                }
                className="hover:cursor-pointer text-red-600"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}


function AddAdmin() {
  const [delUsers, del] = useState<(userInterface & { _id: string })[]>([]);
  const [users, setUsers] = useState([]);
  const [username, setUsername] = useState("");
  const {user}=useContext(userContext);
  useEffect(() => {
    async function handle() {
      const response = await fetch(
        `http://localhost:8000/user/getUsers?username=${username}&team_id=${user.c_team}`,
        {
          method: "GET",
          mode: "cors",
          credentials: "include",
        }
      );
      const data = await response.json();
      if (response.status === 200) setUsers(data);
      console.log("users", delUsers);
    }
    handle();
  }, [username,user.c_team]);
  return (
    <div className="w-full h-full flex flex-col items-center gap-2">
      <div className="flex flex-row gap-10 justify-between px-10 w-full">
        <div className="h-full flex flex-col gap-2">
          <input
            onChange={(e) => {
              setUsername(e.target.value);
            }}
            type="text"
            name="username"
            placeholder="search members"
            className="rounded-md px-2"
          />
          {users.map((user: userInterface & { _id: string }) => (
            <div
              onClick={() => {
                del((x) => {
                  if (x.find((y) => y._id == user._id)) return x;
                  return [...x, user];
                });
              }}
              className="flex flex-row items-center gap-4 px-5 hover:cursor-pointer hover:bg-[#e7e7e7]"
              key={user._id}
            >
              <Avatar src={user.image} username={user.username} />
              <span>{user.username}</span>
            </div>
          ))}
        </div>

        <div className="w-[20rem]">
          <h1>Admin:</h1>
          {delUsers.map((user: userInterface & { _id: string }) => (
            <div
              className="flex flex-row items-center gap-4 px-5 hover:bg-[#e7e7e7]"
              key={user._id}
            >
              <Avatar src={user.image} username={user.username} />
              <span>{user.username}</span>
              <ImCross
                onClick={() =>
                  del((x) => x.filter((x1) => x1._id !== user._id))
                }
                className="hover:cursor-pointer text-red-600"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
