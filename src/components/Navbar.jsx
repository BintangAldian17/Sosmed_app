import { FiSearch } from "react-icons/fi";
import { IoMdNotificationsOutline } from "react-icons/io";
import { TbSend } from "react-icons/tb";
import { FiCamera } from "react-icons/fi";
import { IoIosAdd } from "react-icons/io";

const Navbar = () => {
  return (
    <nav className=" lg:w-full max-w-full h-[46px] flex justify-between items-center">
      <FiCamera className=" sm:w-12 sm:h-12 w-6 h-6 lg:hidden " />
      <div className=" w-80 h-full bg-[#393a48] rounded-md lg:block hidden">
        <form className=" w-full h-full flex justify-start px-3 items-center gap-x-5">
          <button className=" h-full w-fit">
            <FiSearch className=" w-5 h-5" />
          </button>
          <input
            className=" w-full h-full bg-[#393a48] text-white active:border-black rounded-md outline-none placeholder:text-slate-600 placeholder:font-medium"
            placeholder="Search"
          />
        </form>
      </div>
      <div className=" w-fit h-full flex lg:gap-x-8 gap-x-5 justify-center items-center">
        <IoMdNotificationsOutline className=" lg:w-7 lg:h-7 sm:w-14 sm:h-14 w-7 h-7 text-slate-200" />
        <TbSend className=" lg:w-6 lg:h-6 sm:w-12 sm:h-12 w-6 h-6 text-slate-200" />
        <button className=" h-full w-[140px] bg-gradient-to-tr from-[#fa7e1e]  to-[#d62976] rounded-md lg:flex justify-center gap-x-2 px-4 items-center  hidden">
          <div className=" w-fit h-fit bg-white bg-opacity-30 backdrop-blur-xl  drop-shadow-lg rounded-full ">
            <IoIosAdd className=" w-6 h-6 text-slate-300" />
          </div>
          <span className=" font-medium text-sm">Add photo</span>
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
