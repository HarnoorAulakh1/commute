function Footer() {
  return (
    <>
      <div className="w-full flex flex-col justify-center items-center border-t-[.5px] mt-[5rem] border-[#3e3e3e]">
        <div className="flex flex-row justify-between p-2 w-[90%] pt-[8rem]">
          <div className="flex flex-col gap-2 text-[#808080]">
            <p className="text-white font-bold text-md">VIEW</p>
            <p>copyright ©️ 2024 aulakh labs</p>
            <p>All rights reserved</p>
          </div>
          <div className="flex flex-row md:text-lg text-[.5rem] gap-5 justify-center items-center text-[#999999]">
            <div className="flex flex-col gap-2 ">
              <p className="hover:text-[#808080] cursor-pointer">pricing</p>
              <p className="hover:text-[#808080] cursor-pointer">blog</p>
              <p className="hover:text-[#808080] cursor-pointer">contact</p>
            </div>
            <div className="flex flex-col gap-2 ">
              <p className="hover:text-[#808080] cursor-pointer">Privacy Policy</p>
              <p className="hover:text-[#808080] cursor-pointer">Terms of Service</p>
              <p className="hover:text-[#808080] cursor-pointer">Refund Policy</p>
            </div>
            <div className="flex flex-col gap-2 ">
              <p className="hover:text-[#808080] cursor-pointer">Twitter</p>
              <p className="hover:text-[#808080] cursor-pointer">Linkedin</p>
              <p className="hover:text-[#808080] cursor-pointer">Github</p>
            </div>
          </div>
        </div>
        <div className="fade text-7xl md:text-[15rem] p-2 flex items-center">
          <p className="text-[#323232] w-full text-center font-bold">
            EVERY AI
          </p>
        </div>
      </div>
    </>
  );
}

export default Footer;
