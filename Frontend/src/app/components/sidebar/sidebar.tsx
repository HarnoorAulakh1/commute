import { HiOutlineInbox } from "react-icons/hi";
import { CiSearch } from "react-icons/ci";
import Link from "next/link";
import Menu from "../menu";
import { IoSettingsOutline } from "react-icons/io5";
import { MdManageAccounts } from "react-icons/md";
import { CiGrid41 } from "react-icons/ci";
import { FiLogOut } from "react-icons/fi";
import { IoHelpBuoyOutline } from "react-icons/io5";
import { GrChannel } from "react-icons/gr";
import Popup from "../../utilities/popup";
import AddChannel from "../addChannel";
import Channels from "./channels";
import Members from "./members";
import { CheckAdmin } from "./chechAdmin";
import Logout from "./logout";
import GetTeam from "./getTeam";
import DrakMode from "../teambar/darkMode";

async function Sidebar() {
  return (
    <div className="flex flex-col dark:bg-innerBg gap-3 w-[12rem] dark:text-[#ffff] md:w-full rounded-l-xl h-full p-3 border-r-[1px] bg-[#f3f2f2] border-[#dfdfdf]">
      <div className="flex flex-row justify-between items-center p-2">
        <Menu trigger={<GetTeam />}>
          <div className="bg-[#ffffff] dark:bg-[#787777] text-[#8c8c8c] dark:text-[#ffff] rounded-xl flex flex-col w-max h-max absolute ">
            <div className="flex flex-col p-2 py-4 gap-2">
              <CheckAdmin>
                <Tab href="/console/preferences" text="Preferences">
                  <IoSettingsOutline />
                </Tab>
              </CheckAdmin>

              <Tab href="/member" text="Manage members">
                <MdManageAccounts />
              </Tab>
              <Tab href="/channel" text="Create channels">
                <GrChannel />
              </Tab>
              <hr className="w-full h-[1px] bg-[#c0bfbf]" />
              <Tab href="/" text="Workspace settings">
                <CiGrid41 />
              </Tab>
              <DrakMode />
              <hr className="w-full h-[1px] bg-[#c0bfbf]" />
              <Tab href="/" text="Help">
                <IoHelpBuoyOutline />
              </Tab>
              <Logout>
                <Tab href="/" text="Logout">
                  <FiLogOut />
                </Tab>
              </Logout>
            </div>
          </div>
        </Menu>
        <CiSearch className="text-2xl hover:cursor-pointer" />
      </div>
      <div className="flex flex-col gap-2 text-[#403e54] dark:text-[#ffff]">
        {/* <Tab href="/" text="Activity">
          <MdAssistant />
        </Tab>
        <Tab href="/" text="Drafts">
          <CiFileOn />
        </Tab>
        <Tab href="/console/saved" text="Saved items">
          <CiBookmarkCheck />
        </Tab> */}
        <Tab href={`/console/inbox`} text="Inbox">
          <HiOutlineInbox />
        </Tab>
      </div>
      <Channels />
    </div>
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
    <>
      {href == "/channel" || href == "/member" ? (
        <Popup
          trigger={
            <div className="flex flex-row hover:bg-[#ebeced] dark:hover:bg-[#585858] items-center gap-2 pl-2 rounded-lg hover:cursor-pointer">
              <div className="text-xl">{children}</div>
              <h1 className="text-md ">{text}</h1>
            </div>
          }
        >
          {href == "/channel" ? <AddChannel /> : <Members />}
        </Popup>
      ) : (
        <Link
          href={href}
          className="flex flex-row hover:bg-[#ebeced] dark:hover:bg-[#585858] items-center gap-2 pl-2 rounded-lg hover:cursor-pointer"
        >
          <div className="text-xl">{children}</div>
          <h1 className="text-md ">{text}</h1>
        </Link>
      )}
    </>
  );
}

export default Sidebar;
