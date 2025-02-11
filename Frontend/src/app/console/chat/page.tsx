import Scroll from "./scroll";
import Title from "./title";

function Chat() {
  return (
    <div className="w-[100%] h-full flex flex-col overflow-hidden items-center border-r-[1px] border-[#dfdfdf]">
      <Title/>
      <Scroll/>
    </div>
  );
}

export default Chat;
