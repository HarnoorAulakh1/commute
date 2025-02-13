import Image, { StaticImageData } from "next/image";

function Card({
  name,
  position,
  review,
  image,
}: {
  name: string;
  position: string;
  review: string;
  image: StaticImageData;
}) {
  return (
    <div className="bg-[#171717] flex flex-col justify-center items-start gap-2 text-[#d1d0d0] rounded-3xl p-5 w-[25rem]">
      <div className="flex justify-center items-center gap-4 text-[15px]">
        <Image
          src={image}
          alt="dp"
          width={50}
          height={50}
          className="rounded-[2rem]"
        ></Image>
        <div className="flex flex-col items-start justify-center">
          <p>{name}</p>
          <p>{position}</p>
        </div>
      </div>
      <p className="text-md">{review}</p>
    </div>
  );
}

export default Card;
