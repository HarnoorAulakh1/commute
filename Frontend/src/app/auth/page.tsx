import Form from "./Form";
import { cookies } from "next/headers";

export const revalidate = 1;

export default async function Auth() {
  // const cookieStore = await cookies();
  // let token:string = cookieStore.get("token")?.value || "";
  // token=token==undefined?"":token;
  // const res = await fetch("https://seepbackend.onrender.com/user/checkLogin", {
  //   method: "GET",
  //   mode: "cors",
  //   headers: {
  //     Authorization: JSON.stringify(token),
  //   },
  //   credentials: "include",
  // });
  // let response=res;
  // response = await res.json();
  // console.log(response);
    
  return (
    <>
      {(
        <div className="w-full h-full flex  items-center justify-center bg-black">
          <div className="w-[90%] flex flex-col md:flex-row gap-2 items-center justify-center pt-5">
            <div className="flex flex-col gap-2">
              <h1 className="text-white text-8xl font-bold whitespace-pre-line">
                Welcome to{" "}
                <span className="underline decoration-[#4BB543]">VIEW</span>{" "}
                Analytics
              </h1>
            </div>
            <Form />
          </div>
        </div>
      )}
    </>
  );
}
