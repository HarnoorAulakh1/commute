import Title from "../../components/messages/title";
import { cookies } from "next/headers";
import Tab from "./tab";

async function Inbox() {
  const cookies1 = await cookies();
  const response1= await fetch("http://localhost:8000/user/checkLogin", {
    method: "GET",
    mode: "cors",
    headers: {
      Authorization: JSON.stringify(cookies1.get("token")),
    },
    credentials: "include",
  });
const user= await response1.json();
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
        <Tab id="0"  img="/fire.png" name="General" message="Lets bring some Booze" type="invite" unseen={2} />
      </div>
    </div>
  );
}


export default Inbox;
