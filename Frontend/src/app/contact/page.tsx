import React from "react";
import Footer from "../components/home/footer";
function Contact() {
  return (
    <div className="w-full">
      <div className="pt-[6rem] md:ml-[12rem] w-[80%] md:w-[30rem] m-auto  flex flex-col gap-10">
        <div className="flex flex-col gap-4 justify-center">
          <h1 className="font-bold text-2xl text-white ">Contact Us</h1>
          <p className=" text-[#a19f9f] text-md w-full md:w-[60%]">
            Please reach out to us and we will get back to you at the speed of
            light.
          </p>
        </div>
        <form className="text-[#bdbcbc] flex flex-col gap-8 w-[90%]">
          <div className="flex flex-col gap-2 ">
            <label>Full Name</label>
            <input
              type="text"
              placeholder="Berlin Hitler"
              className="text-white py-2 pl-4"
            />
          </div>
          <div className="flex flex-col gap-2">
            <label> Email Address</label>
            <input
              type="email"
              placeholder="joseph@hello.com"
              className="text-white py-2 pl-4"
            />
          </div>
          <div className="flex flex-col gap-2 ">
            <label>Company</label>
            <input
              type="text"
              placeholder="Amazon"
              className="text-white py-2 pl-4"
            />
          </div>
          <div className="flex flex-col gap-2 ">
            <label>Message</label>
            <textarea
              placeholder="Type your message here"
              className="text-white py-2 height-[20rem] pl-4 bg-[#171717] rounded-xl"
            />
          </div>
          <div className="bg-[#6b6b6b] rounded-[1rem] py-[0.05rem] flex justify-center items-center">
            <button className="hover:bg-[#000000e6] w-full bg-[#171717] px-3 py-1 rounded-[2.2rem] transition ease-linear duration-150">
              Submit
            </button>
          </div>
        </form>
      </div>

      <Footer />
    </div>
  );
}

export default Contact;
