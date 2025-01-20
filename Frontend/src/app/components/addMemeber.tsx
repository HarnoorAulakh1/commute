import { GoHash } from "react-icons/go";

export default function AddMember() {
  return (
    <div className="w-[25%] h-full flex flex-col items-center gap-2">
      <Title title="Add Member" />
      <form>
        <input type="text" placeholder="search members"  className="rounded-md px-2"/>
      </form>
    </div>
  );
}

function Title({ title }: { title: string }) {
  return (
    <div className="text-[#76747f] flex flex-row items-center shadow-sm w-full font-bold justify-between p-4  border-b-[1px] border-[#dfdfdf]">
      <div className="text-[#76747f] flex flex-row items-center w-full h-full font-bold justify-between  ">
        <div className=" flex flex-row items-center gap-2">
          <div className="bg-[#fefefe] rounded-md py-1">
            <GoHash className="bg-white" />
          </div>
          <span className="hover:cursor-pointer">{title}</span>
        </div>
      </div>
    </div>
  );
}
