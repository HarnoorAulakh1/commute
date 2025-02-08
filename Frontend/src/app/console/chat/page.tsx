import Title from "../../components/messages/title";
import Scroll from "./scroll";

function Chat() {
  return (
    <div className="w-[100%] h-full flex flex-col overflow-hidden items-center border-r-[1px] border-[#dfdfdf]">
      <Title title="Chat"/>
      <Scroll/>
    </div>
  );
}

export default Chat;
