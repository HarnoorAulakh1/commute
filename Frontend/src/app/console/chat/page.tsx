import Message from "../../components/messages/message";
import Title from "../../components/messages/title";
import Scroll from "./scroll";

function Chat() {
  return (
    <div className="w-[100%] h-full flex flex-col overflow-hidden items-center border-r-[1px] border-[#dfdfdf]">
      <Title title="Chat"/>
      <Scroll>
        <Message
          file={{ name: "", type: "", link: "" }}
          image="/img3.jpeg"
          name="John Doe"
          time="2"
          message="I have already prepared all styles and components according to our standards during the design phase, so the Ul kit is 90% complete. All that remains is to add some states to the "
        />
        <Message
          image="/img3.jpeg"
          name="John Doe"
          time="2"
          message="I have already prepared all styles and components according to our standards during the design phase, so the Ul kit is 90% complete. All that remains is to add some states to the "
          file={{
            name: "pdf resume",
            type: "pdf",
            link: "https://drive.google.com/file/d/1z6yYQt5sbNdyzA8sKjwBGvOShxkHLKMg/view?usp=drive_link",
          }}
        />
        <Message
          image="/img3.jpeg"
          name="John Doe"
          time="2"
          message="I have already prepared all styles and components according to our standards during the design phase, so the Ul kit is 90% complete. All that remains is to add some states to the "
          file={{
            name: "Harley Davidson",
            type: "image",
            link: "https://www.bossrides.in/wp-content/uploads/2023/03/harley-davidson-forty-eight-1-min-1.jpg",
          }}
        />
      </Scroll>
    </div>
  );
}

export default Chat;
