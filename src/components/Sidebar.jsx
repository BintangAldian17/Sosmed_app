import React from "react";
import image from "../assets/Dummy.jpg";
import { FiSearch } from "react-icons/fi";
import { IoMdNotificationsOutline } from "react-icons/io";
import { TbSend } from "react-icons/tb";
import { FiLogOut } from "react-icons/fi";

const Sidebar = () => {
  return (
    <div className=" h-screen lg:w-80 lg:pt-20 lg:px-5 lg:flex hidden flex-col">
      <div className=" w-full flex flex-col justify-center items-center gap-y-8">
        <div className=" flex flex-col justify-center items-center gap-y-3 ">
          <img
            className="lg:w-[90px] lg:h-[90px] p-1 rounded-full ring-2 ring-red-500 object-cover"
            src={image}
            alt="Bordered avatar"
          />
          <h1 className=" font-semibold lg:text-xl">BintangAldian17_</h1>
          <p className=" text-slate-500">@bintangaldian</p>
        </div>
        <div className=" flex lg:h-16 w-full justify-center items-center">
          <div className=" w-full border-r-2  border-gray-700 h-full flex items-center lg:pr-4 flex-col lg:gap-y-2">
            <h1 className=" font-bold text-lg">46</h1>
            <p className=" text-slate-500 font-medium text-lg">Posts</p>
          </div>
          <div className=" w-full border-r-2 border-gray-700 h-full flex justify-center items-center flex-col lg:px-4 lg:gap-y-2">
            <h1 className=" font-bold text-lg">2.8k</h1>
            <p className=" text-slate-500 font-medium text-lg">followers</p>
          </div>
          <div className=" w-full  h-full flex justify-center items-center flex-col lg:pl-4 lg:gap-y-2">
            <h1 className=" font-bold text-lg">545</h1>
            <p className=" text-slate-500  font-medium text-lg">following</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
