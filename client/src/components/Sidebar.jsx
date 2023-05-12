import React, { useContext } from "react";
import image from "../assets/Dummy.jpg";
import { publicClient } from "../axios/RequestMethod";
import { FiSearch } from "react-icons/fi";
import { IoMdNotificationsOutline } from "react-icons/io";
import { TbSend } from "react-icons/tb";
import { FiLogOut } from "react-icons/fi";
import { HiOutlineViewGrid } from "react-icons/hi";
import { useLogout } from "../hooks/Users/Logout";
import { useNavigate } from "react-router-dom";
import { NavLink } from "react-router-dom";
import { AuthContext } from "../context-provider/AuthContextProvider";
import avatarUser from "../assets/user.png";

const Sidebar = () => {
  const navigate = useNavigate();
  const [currentUser] = useContext(AuthContext);

  const logout = async () => {
    try {
      await publicClient.post("user/logout");
      navigate("/login");
      localStorage.removeItem("user");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className=" h-screen lg:flex-1 lg:pt-20  lg:flex hidden flex-col gap-y-9">
      <div className=" w-full flex flex-col justify-center items-center gap-y-8 px-5">
        <div className=" flex flex-col justify-center items-center gap-y-3 ">
          {currentUser.avatar === null ? (
            <img
              className="lg:w-[90px] lg:h-[90px] p-1 rounded-full ring-2 ring-red-500 object-cover"
              src={
                <img
                  className="w-full h-full object-cover rounded-full"
                  src={`../../publict/upload/${currentUser.avatar}`}
                  alt="Bordered avatar"
                />
              }
              alt="Bordered avatar"
            />
          ) : (
            <img
              className="lg:w-[90px] lg:h-[90px] p-1 rounded-full ring-2 ring-red-500 object-cover"
              src={avatarUser}
              alt="Bordered avatar"
            />
          )}
          <h1 className=" font-semibold lg:text-xl">{currentUser.username}</h1>
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
      <div className=" flex flex-col w-full pb-4 gap-y-4 border-b border-gray-800">
        <NavLink
          className={({ isActive }) => (isActive ? " w-full border-r-2 border-red-500 font-medium text-red-500" : "")}
          to="/">
          <button className=" w-full px-10 flex items-center justify-start gap-x-5">
            <div className=" w-9 h-9">
              <HiOutlineViewGrid className=" w-8 h-8" />
            </div>
            <h1 className=" text-xl  ">Feed</h1>
          </button>
        </NavLink>
        <NavLink
          className={({ isActive }) => (isActive ? " w-full border-r-2 border-red-500 font-medium text-red-500" : "")}
          to="/explore">
          <button className=" w-full px-10 flex items-center justify-start gap-x-5">
            <div className=" w-9 h-9">
              <FiSearch className=" w-7 h-7" />
            </div>
            <h1 className=" text-xl  ">Explore</h1>
          </button>
        </NavLink>
        <NavLink
          className={({ isActive }) => (isActive ? " w-full border-r-2 border-red-500 font-medium text-red-500" : "")}
          to="/notif">
          <button className=" w-full px-10 flex items-center justify-start gap-x-5">
            <div className=" w-9 h-9">
              <IoMdNotificationsOutline className=" w-8 h-8" />
            </div>
            <h1 className=" text-xl  ">Notifications</h1>
          </button>
        </NavLink>
        <NavLink
          className={({ isActive }) => (isActive ? " w-full border-r-2 border-red-500 font-medium text-red-500" : "")}
          to="/direct">
          <button className=" w-full px-10 flex items-center justify-start gap-x-5">
            <div className=" w-9 h-9">
              <TbSend className=" w-7 h-7" />
            </div>
            <h1 className=" text-xl">Direct</h1>
          </button>
        </NavLink>
      </div>
      <div className=" w-full flex items-center px-10">
        <button className=" flex gap-x-5 items-center justify-center" onClick={logout}>
          <FiLogOut className=" w-8 h-8" />
          <h1 className="  text-xl">Logout</h1>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
