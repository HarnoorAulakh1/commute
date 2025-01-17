import Input from "../../components/messages/input";
import Message from "../../components/messages/message";
import Title from "../../components/messages/title";

function Chat() {
  return (
    <div className="relative w-[55%] h-[100%] flex flex-col items-center border-r-[1px] border-[#dfdfdf]">
      <Title title="Websites / UI&Ux" />
      <div className="flex flex-col scroll1 gap-8 items-start h-[100%] p-4 overflow-scroll overflow-x-hidden">
        <Message
          file={{ name: "", type: "", link: "" }}
          img="/img3.jpeg"
          name="John Doe"
          time="2"
          message="I have already prepared all styles and components according to our standards during the design phase, so the Ul kit is 90% complete. All that remains is to add some states to the "
        />
        <Message
          img="/img3.jpeg"
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
          img="/img3.jpeg"
          name="John Doe"
          time="2"
          message="I have already prepared all styles and components according to our standards during the design phase, so the Ul kit is 90% complete. All that remains is to add some states to the "
          file={{
            name: "Harley Davidson",
            type: "image",
            link: "https://www.bossrides.in/wp-content/uploads/2023/03/harley-davidson-forty-eight-1-min-1.jpg",
          }}
        />
        <div className="opacity-0 pb-10">
          <Message
            file={{ name: "", type: "", link: "" }}
            img="/img3.jpeg"
            name="John Doe"
            time="2"
            message="I have already prepared all styles and components according to our standards during the design phase, so the Ul kit is 90% complete. All that remains is to add some states to the "
          />
        </div>
      </div>
      <Input />
    </div>
  );
}

export default Chat;
