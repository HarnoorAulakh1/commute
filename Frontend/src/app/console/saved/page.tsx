import Title from "../../components/messages/title";

function Saved() {
    //const data=await getLinkPreview("https://drive.google.com/file/d/16yMqzob2Vah48Ry9TQMkhsWTYxav45Ed/view?usp=drive_link")
    //console.log(data);
  return (
    <div className="relative w-[55%] h-[100%] flex flex-col items-center border-r-[1px] border-[#dfdfdf]">
      <Title title="Saved" />
      <div className="flex flex-col items-center scroll1 gap-2 w-full h-[100%] p-4 overflow-scroll overflow-x-hidden">
        <h1>Hello</h1>
        </div>
    </div>
  );
}


export default Saved;