import Image from "next/image";
import TimeAgo from 'javascript-time-ago'
import en from 'javascript-time-ago/locale/en'

TimeAgo.addDefaultLocale(en);

function Message({
  sender_id,
  user_id,
  image,
  name,
  time,
  message,
  file,
}: {
  user_id:string;
  channel_id: string;
  team_id: string;
  sender_id: string;
  image: string;
  name: string;
  time?: Date;
  message: string;
  file: { type: string; link: string; name: string };
}) {
  //console.log("time=",time);
  const date = new Date(time || Date.now());
  const timeAgo = new TimeAgo('en-US')
  const ago = timeAgo.format(date);
  return (
    <div className='w-[85%] relative text-black dark:text-[#ffffff]'>
      <div className={`flex flex-row gap-2 w-full  ${sender_id==user_id?"justify-end":"justify-start"}`}>
        <div className={`rounded-[5rem] h-max overflow-hidden`}>
          <Image
            src={image?image:"/file.jpeg"}
            height={40}
            width={40}
            alt="Dummy Image"
            className="rounded-full aspect-square object-cover"
          />
        </div>

        <div className="flex flex-col items-start">
          <div className="flex flex-row gap-2 items-baseline">
            <p className=" font-bold">{name}</p>
            <p className="text-[#908f9e] text-sm">{ago}</p>
          </div>
          <p className="text-[#403e54] dark:text-[#d2d2d2] h-full">{message}</p>
        </div>
      </div>
      {file?.type && (
        <div className="flex flex-col gap-2 justify-center pl-[3rem] mt-2">
          {file.type.split("/")[0] === "image" ? (
            <a href={file.link} target="_blank">
              <Image
                src={file.link}
                height={200}
                width={200}
                alt="Dummy Image"
                className="rounded-md"
              />
               <p>{file.name}</p>
            </a>
          ) : (
            <div className="flex flex-col items-center w-max">
              <a href={file.link} target="_blank">
                <Image src="/file.jpeg" className="bg-white" width={100} height={100} alt=""/>
              </a>
              <p>{file.name}</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default Message;
