"use client";
import React, { useContext, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
//import { useNotify } from "reactjs-notify-toast";
import { userContext } from "../components/profile";

export const revalidate = 1;

function Form() {
  const path = usePathname();
  const arr = path.split("/");
  const [state, set] = useState<boolean>(
    arr[arr.length - 1] == "signup" ? false : true
  );
  return <>{state ? <Login setter={set} /> : <Signup setter={set} />}</>;
}

function Signup({
  setter,
}: {
  setter: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const [state, fileState] = useState<string | null>(null);
  async function handle(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const data = new FormData(form);
    const response = await fetch("api/user/register", {
      method: "POST",
      mode: "cors",
      body: data,
      credentials: "include",
    });
    console.log(response.status);
    if (response.status == 200) alert("Account created successfully");
    else alert(JSON.stringify(await response.json()));
    form.reset();
  }
  return (
    <div className="w-[90%]  md:w-[60%] rounded-md p-10 bg-white h-max">
      <h1 className="text-xl font-bold mb-[3rem]">Create an account</h1>
      <form className="flex flex-col gap-[1rem] font-light" onSubmit={handle}>
        <div className="flex flex-col">
          <label htmlFor="">
            Username <span className="text-red-600">*</span>
          </label>
          <input
            type="text"
            placeholder="Username"
            name="username"
            className="p-2   rounded-md  bg-[#ececec] border-white focus:border-[#7b7b7b]"
            required
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="">
            Password <span className="text-red-600">*</span>
          </label>
          <input
            type="password"
            name="password"
            placeholder="Password"
            className="p-2  bg-[#ececec] border-white focus:border-[#7b7b7b] rounded-md "
            required
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="">
            Email <span className="text-red-600">*</span>
          </label>
          <input
            type="email"
            name="email"
            placeholder="Email"
            className="p-2  bg-[#ececec] border-white focus:border-[#7b7b7b] rounded-md"
            required
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="">
            First name <span className="text-red-600">*</span>
          </label>
          <input
            type="text"
            name="firstName"
            placeholder="First name"
            className="p-2  bg-[#ececec] border-white focus:border-[#7b7b7b] rounded-md"
            required
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="">
            Last name <span className="text-red-600">*</span>
          </label>
          <input
            type="text"
            name="lastName"
            placeholder="Last name"
            className="p-2 bg-[#ececec] border-white focus:border-[#7b7b7b] rounded-md"
            required
          />
        </div>
        <div className="flex flex-col gap-2">
          <div className="flex flex-row gap-2">
            <p>Profile picture:</p>
            <label
              htmlFor="image"
              className="p-2 px-4 bg-[#65696f] text-white rounded-md hover:cursor-pointer"
            >
              upload
            </label>
            <input
              type="file"
              name="image"
              id="image"
              onChange={(e) => {
                if (e.target.files && e.target.files.length > 0) {
                  fileState(e.target.files[0].name);
                }
              }}
              className="p-2  bg-[#ececec] border-white focus:border-[#7b7b7b] rounded-md hidden"
            />
          </div>
          {state && (
            <p className="text-[#2c9631] overflow-hidden">
              {state} uploaded successfully
            </p>
          )}
        </div>

        <div className="flex flex-row justify-between items-center text-sm font-light">
          <button className="bg-[#156ff6] text-white py-2 px-4 rounded-md w-max">
            Register
          </button>
          <span className="text-[#165fd4]" onClick={() => setter((x) => !x)}>
            Back to Login
          </span>
        </div>
      </form>
    </div>
  );
}

function Login({
  setter,
}: {
  setter: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const [Loading, set] = useState(false);
  const router = useRouter();
  //const { show } = useNotify();
  const { dispatch } = useContext(userContext);
  async function handle(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const data = new FormData(form);
    //const keys = data.keys();
    const response = await fetch("api/user/login", {
      method: "POST",
      mode: "cors",
      body: JSON.stringify({
        username: data.get("username"),
        password: data.get("password"),
      }),
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });
    const res = await response.json();
    console.log(res);
    if (response.status == 200) {
      //show(`Logged in as ${res.username}`, "success");
      dispatch(res);
      set(true);
      router.push("/console");
      set(false);
      console.log(`Logged in as ${res.username}`);
    } else {
      alert(res.message);
    }
    form.reset();
  }
  return (
    <>
      {Loading ? (
        <div>
          <h1>Loading.....</h1>
        </div>
      ) : (
        <div className="w-[90%] md:w-[60%] rounded-md h-max p-10 bg-white">
          <h1 className="text-xl font-bold mb-[3rem]">Login</h1>
          {/* <div dangerouslySetInnerHTML={{ __html: svg }} className="w-[2rem]"/> */}
          <form
            className="flex flex-col gap-[1rem] font-light"
            onSubmit={(e) => handle(e)}
          >
            <div className="flex flex-col">
              <label htmlFor="">
                Email or Username <span className="text-red-600">*</span>
              </label>
              <input
                type="text"
                name="username"
                placeholder="Username"
                className="p-2 bg-[#ececec] border-white focus:border-[#7b7b7b] rounded-md"
                required
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="">
                Password <span className="text-red-600">*</span>
              </label>
              <input
                type="password"
                name="password"
                placeholder="Password"
                className="p-2 bg-[#ececec] border-white focus:border-[#7b7b7b] rounded-md"
                required
              />
            </div>
            <div className="flex flex-row gap-4 items-center text-sm font-light">
              <button
                type="submit"
                className="bg-[#156ff6] text-white py-2 px-4 rounded-md w-max"
              >
                Login
              </button>
              <div className="flex flex-col">
                New here?
                <span
                  className="text-[#165fd4]"
                  onClick={() => setter((x) => !x)}
                >
                Create an account
                </span>
              </div>
            </div>
          </form>
        </div>
      )}
    </>
  );
}

export default Form;
