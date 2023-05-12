import React from "react";
import imageLogin from "../assets/img-login.jpg";

const Auth = ({ children }) => {
  return (
    <div
      className=" w-full h-screen flex justify-center items-center
  ">
      <div className=" bg-[#222121] w-[55%] h-[70%] shadow-2xl rounded-xl flex overflow-hidden">
        <div className="w-full h-full">
          <div className=" w-full justify-center h-full flex flex-col px-10 gap-y-4">{children}</div>
        </div>
        <div className="w-full h-full overflow-hidden">
          <img src={imageLogin} className=" w-full h-full object-cover" />
        </div>
      </div>
    </div>
  );
};

export default Auth;
