import Title from "../../components/messages/title";
import { cookies } from "next/headers";
import Tab from "./tab";
import { userInterface } from "@/types";

async function Inbox() {
  const cookies1 = await cookies();
  const response1 = await fetch("http://localhost:8000/user/checkLogin", {
    method: "GET",
    mode: "cors",
    headers: {
      Authorization: JSON.stringify(cookies1.get("token")),
    },
    credentials: "include",
  });
  const user = await response1.json();
  const response = await fetch(
    `http://localhost:8000/notification/getNotification?user_id=${user._id}`,
    {
      method: "GET",
      mode: "cors",
      headers: {
        Authorization: JSON.stringify(cookies1.get("token")),
      },
      credentials: "include",
    }
  );
  const data = await response.json();
  console.log("hello",data);
  return (
    <div className="w-[100%] h-full flex flex-col overflow-hidden items-center border-r-[1px] border-[#dfdfdf]">
      <Title title="Inbox" />
      <div className="flex flex-col items-center scroll1 gap-2 w-full h-[100%] p-4 overflow-scroll overflow-x-hidden">
        {data.map((notification:{_id:string,sender_id:userInterface,name:string,message:string,team_id:string,type:string,unseen:number}) => (
          <Tab
            id={notification._id}
            img={notification.sender_id.image}
            name={notification.name}
            message={notification.message}
            team_id={notification.team_id}
            type={notification.type}
            unseen={notification.unseen}
            key={notification._id}
          />
        ))}
      </div>
    </div>
  );
}

export default Inbox;
