import Image from "next/image";

function Message({
  img,
  name,
  time,
  message,
  file,
}: {
  img: string;
  name: string;
  time: string;
  message: string;
  file: { type: string; link: string; name: string };
}) {
  return (
    <div>
      <div className="flex flex-row gap-2 w-[85%]">
        <div className="rounded-[5rem] w-max h-max overflow-hidden">
          <Image
            src={img}
            height={40}
            width={40}
            alt="Dummy Image"
            className="rounded-full aspect-square object-cover"
          />
        </div>

        <div className="flex flex-col items-start w-full">
          <div className="flex flex-row gap-2 items-baseline">
            <p className="text-black font-bold">{name}</p>
            <p className="text-[#908f9e] text-sm">{time}d ago</p>
          </div>
          <p className="text-[#403e54] h-full">{message}</p>
        </div>
      </div>
      {file?.type && (
        <div className="flex flex-col gap-2 justify-center pl-[3rem] mt-2">
          {file.type === "image" ? (
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
                <Image src="/pdf.png" width={100} height={100} alt=""/>
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
