import Image from "next/image";
import Title from "../../components/messages/title";
import Link from "next/link";

function DirectMessages() {
  return (
      <div className="flex flex-col items-center scroll1 gap-2 w-full h-[100%] p-4 overflow-scroll overflow-x-hidden">
        <Tab
          href="/console/chat"
          img="/fire.png"
          name="General"
          message="Lets bring some Booze"
          unseen={2}
        />
        <Tab
          href="/console/chat"
          img="/fire.png"
          name="Random"
          message="Lets bring some Booze"
          unseen={2}
        />
        <Tab
          href="/console/chat"
          img="/fire.png"
          name="Design"
          message="Lets bring some Booze"
          unseen={2}
        />
         <Tab
          href="/console/chat"
          img="/fire.png"
          name="Design"
          message="Lets bring some Booze"
          unseen={2}
        />
         <Tab
          href="/console/chat"
          img="/fire.png"
          name="Design"
          message="Lets bring some Booze"
          unseen={2}
        />
         <Tab
          href="/console/chat"
          img="/fire.png"
          name="Design"
          message="Lets bring some Booze"
          unseen={2}
        />
         <Tab
          href="/console/chat"
          img="/fire.png"
          name="Design"
          message="Lets bring some Booze"
          unseen={2}
        />
         <Tab
          href="/console/chat"
          img="/fire.png"
          name="Design"
          message="Lets bring some Booze"
          unseen={2}
        />
         <Tab
          href="/console/chat"
          img="/fire.png"
          name="Design"
          message="Lets bring some Booze"
          unseen={2}
        />
         <Tab
          href="/console/chat"
          img="/fire.png"
          name="Design"
          message="Lets bring some Booze"
          unseen={2}
        />
         <Tab
          href="/console/chat"
          img="/fire.png"
          name="Design"
          message="Lets bring some Booze"
          unseen={2}
        />
      </div>
  );
}

function Tab({
  href,
  img,
  name,
  message,
  unseen,
}: {
  href: string;
  img: string;
  name: string;
  message: string;
  unseen: number;
}) {
  return (
    <Link
      href={href}
      className="flex flex-row pl-5 items-center gap-5 text-white w-[85%] transition-all duratio-150 rounded-xl p-2 hover:w-[70%] bg-[#52708d] hover:cursor-pointer"
    >
      <div className="rounded-[5rem] w-max h-max overflow-hidden">
        <Image
          src={img}
          height={40}
          width={40}
          alt="Dummy Image"
          className="rounded-full aspect-square object-cover"
        />
      </div>
      <div className="flex flex-row justify-between items-center w-full pr-5">
        <div className="flex flex-col ">
          <p>{name}</p>
          <p className="text-sm text-[#d4d2d7]">{message}</p>
        </div>
        <div className="rounded-[1rem] bg-slate-500 px-2">{unseen}</div>
      </div>
    </Link>
  );
}

export default DirectMessages;
