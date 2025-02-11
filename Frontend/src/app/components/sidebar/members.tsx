"use client";
import { HiDotsVertical } from "react-icons/hi";
import { useState, useEffect } from "react";
import { Avatar } from "../addMemeber";
import { userInterface } from "@/types";
import { useContext } from "react";
import { userContext } from "../profile";

function Members() {
  return (
    <div className="w-[20rem] h-full flex flex-col overflow-hidden items-center border-r-[1px] border-[#dfdfdf]">
      <div className="flex flex-col items-center scroll1 gap-2 w-full h-[100%] p-4 overflow-x-hidden">
        <h1 className="font-bold">Manage Members</h1>
        <AddMember />
      </div>
    </div>
  );
}

export default Members;

function AddMember() {
  const [users, setUsers] = useState<(userInterface & {_id:string})[]>([]);
  const [username, setUsername] = useState("");
  const { user } = useContext(userContext);
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
      console.log(data);
      if (response.status === 200) setUsers(data);
    }
    handle();
  }, [username, user.c_team]);
  return (
    <div className="w-full h-[20rem] flex flex-col items-center gap-2">
      <div className="flex flex-row gap-10 justify-between  w-full h-full">
        <div className="h-full w-full flex flex-col gap-2">
          <input
            onChange={(e) => {
              setUsername(e.target.value);
            }}
            type="text"
            name="username"
            placeholder="search members"
            className="rounded-md px-2 border-[1px] border-[#c0bfbf]"
          />
          <div className="h-full overflow-auto overflow-x-hidden relative">
            {users.map((user: userInterface & { _id: string }) => (
              <User user={user} key={user._id} set={setUsers}/>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function User({ user,set }: { user: userInterface & { _id: string },set:React.Dispatch<React.SetStateAction<(userInterface & {_id:string})[]> > }) {
  const [show, setShow] = useState(false);
  const { user: user1 } = useContext(userContext);
  const [admin, setAdmin] = useState(false);
  useEffect(() => {
    async function handle(){
    const response = await fetch(`http://localhost:8000/team/checkAdmin?id=${user._id}&team_id=${user1.c_team}`, {
      method: "GET",
      mode: "cors",
      credentials: "include",
    });
    const data = await response.json();
    setAdmin(data.admin);
  }
  handle();
  }, [user._id, user1.c_team]);
  return (
    <div
      key={user._id}
      className="flex flex-row items-center justify-between hover:bg-[#e7e7e7]"
    >
      <div
        onClick={() => {
          setShow((x) => !x);
        }}
        className="flex flex-row items-center gap-4 px-5 hover:cursor-pointer"
      >
        <Avatar src={user.image} username={user.username} />

        <div className="flex flex-col">
        <span>{user.username}</span>
        {admin && <span className="text-sm text-gray-400">admin</span>}
        </div>
      </div>
      {user1.admin && user1._id != user._id && (
        <div className="felx flex-col gap-2">
          <HiDotsVertical onClick={() => setShow((x) => !x)} />
          {show && <Options admin={admin} _id={user._id} set={set}/>}
        </div>
      )}
    </div>
  );
}

function Options({ _id,admin,set}: { _id: string,admin:boolean,set:React.Dispatch<React.SetStateAction<(userInterface & {_id:string})[]> > }) {
  const { user } = useContext(userContext);
  async function removeMember() {
    const response = await fetch(`/api/team/removeMember`, {
      method: "DELETE",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ member_id: _id, team_id: user.c_team }),
      credentials: "include",
    });
    if (response.status == 200){
       console.log("Successfully removed member");
        set((x)=>x.filter((x1)=>x1._id!=_id));
      }
  }
  async function makeAdmin() {
    const response = await fetch(`/api/team/makeAdmin?id=${_id}`, {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ member_id: _id, team_id: user.c_team }),
      credentials: "include",
    });
    if (response.status == 200) console.log("Member made admin");
  }
  async function removeAdmin() {
    const response = await fetch(`/api/team/removeAdmin?id=${_id}`, {
      method: "DELETE",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ member_id: _id, team_id: user.c_team }),
      credentials: "include",
    });
    if (response.status == 200) console.log("Admin removed");
  }
  return (
    <div className="text-[.8rem] absolute right-0 flex flex-col justify-start gap-2 bg-white border-[2px] border-[#e5e5e5] py-2 rounded-lg">
      <button
        onClick={removeMember}
        className="hover:cursor-pointer hover:bg-slate-200 w-full text-start px-2"
      >
        Remove Member
      </button>
     {!admin &&  <button
        onClick={makeAdmin}
        className="hover:cursor-pointer hover:bg-slate-200 w-full text-start px-2"
      >
        Make Admin
      </button>}
      {admin && <button
        onClick={removeAdmin}
        className="hover:cursor-pointer hover:bg-slate-200 w-full text-start px-2"
      >
        Remove Admin
      </button>}
    </div>
  );
}
