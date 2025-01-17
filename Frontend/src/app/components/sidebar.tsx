import { MdAssistant } from "react-icons/md";
import { CiFileOn } from "react-icons/ci";
import { CiBookmarkCheck } from "react-icons/ci";
import { HiOutlineInbox } from "react-icons/hi";
import { LuMessageSquareMore } from "react-icons/lu";
import { CiSearch } from "react-icons/ci";
import { FaCaretDown } from "react-icons/fa";
import Link from "next/link";
import Image from "next/image";
import List from "./list";
import Menu from "./menu";
import { IoSettingsOutline } from "react-icons/io5";
import { MdManageAccounts } from "react-icons/md";
import { CiGrid41 } from "react-icons/ci";
import { FiLogOut } from "react-icons/fi";
import { IoHelpBuoyOutline } from "react-icons/io5";
import { MdOutlineDarkMode } from "react-icons/md";

function Sidebar() {
  return (
    <div className="flex flex-col gap-3 w-[20%] h-full p-3 border-r-[1px] border-[#dfdfdf]">
      <div className="flex flex-row justify-between items-center p-2">
        <Menu
          trigger={
            <div className="flex flex-row items-center hover:cursor-pointer">
              <h1 className="font-bold text-2xl ">Skype</h1>
              <FaCaretDown />
            </div>
          }
        >
          <div className="bg-[#ffffff] text-[#8c8c8c] rounded-xl flex flex-col w-max h-max absolute top-10">
            <div className="flex flex-col p-2 py-4 gap-2">
              <Tab href="/" text="Preferences">
                <IoSettingsOutline />
              </Tab>
              <Tab href="/" text="Manage members">
                <MdManageAccounts />
              </Tab>
              <hr className="w-full h-[1px] bg-[#c0bfbf]" />
              <Tab href="/" text="Workspace settings">
                <CiGrid41 />
              </Tab>
              <Tab href="/" text="Dark Mode">
                <MdOutlineDarkMode />
              </Tab>
              <hr className="w-full h-[1px] bg-[#c0bfbf]" />
              <Tab href="/" text="Help">
                <IoHelpBuoyOutline />
              </Tab>
              <Tab href="/" text="Logout">
                <FiLogOut />
              </Tab>
            </div>
          </div>
        </Menu>
        <CiSearch className="text-2xl hover:cursor-pointer" />
      </div>
      <div className="flex flex-col gap-2">
        <Tab href="/" text="Activity">
          <MdAssistant />
        </Tab>
        <Tab href="/" text="Drafts">
          <CiFileOn />
        </Tab>
        <Tab href="/console/saved" text="Saved items">
          <CiBookmarkCheck />
        </Tab>
        <Tab href="/" text="Inbox">
          <HiOutlineInbox />
        </Tab>
        <Tab href="/console/dm" text="Direct Messages">
          <LuMessageSquareMore />
        </Tab>
      </div>
      <List heading="Channels">
        <div className="flex flex-col gap-2 pl-2">
          <Tab2 href="/console/chat" text="General">
            <Image alt="fire" src="/fire.png" width={20} height={20} />
          </Tab2>
          <Tab2 href="/console/chat" text="Random">
            <MdAssistant />
          </Tab2>
          <Tab2 href="/console/chat" text="Design">
            <MdAssistant />
          </Tab2>
          <Tab2 href="/console/chat" text="Development">
            <MdAssistant />
          </Tab2>
          <Tab2 href="/console/chat" text="Marketing">
            <MdAssistant />
          </Tab2>
        </div>
      </List>
    </div>
  );
}

function Tab2({
  children,
  href,
  text,
}: {
  children: React.ReactNode;
  href: string;
  text: string;
}) {
  return (
    <Link
      href={href}
      className="flex flex-row hover:bg-[#ebeced] items-center gap-2 pl-2 rounded-lg hover:cursor-pointer"
    >
      <div className="text-xl">{children}</div>
      <h1 className="text-sm text-[#908f9e]">{text}</h1>
    </Link>
  );
}

function Tab({
  children,
  href,
  text,
}: {
  children: React.ReactNode;
  href: string;
  text: string;
}) {
  return (
    <Link
      href={href}
      className="flex flex-row hover:bg-[#ebeced] items-center gap-2 pl-2 rounded-lg hover:cursor-pointer"
    >
      <div className="text-xl">{children}</div>
      <h1 className="text-md ">{text}</h1>
    </Link>
  );
}

export default Sidebar;
