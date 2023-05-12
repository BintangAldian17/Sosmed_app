import { BsSend } from "react-icons/bs";

const OpenChat = () => {
  return (
    <div className=" w-full h-full flex justify-center items-center flex-col gap-y-3">
      <div className=" p-6 rounded-full w-24 h-24 border-2 border-slate-300 flex items-center justify-center">
        <BsSend className=" w-24 h-24" />
      </div>
      <div className=" flex flex-col items-center gap-y-2">
        <h1 className=" text-xl">Your Message</h1>
        <p className=" text-slate-500">Send photos and private messages to friends or groups.</p>
      </div>
      <button className="bg-gradient-to-tr from-[#fa7e1e]  to-[#d62976] rounded-md px-3 py-1 font-medium mt-2">
        Send Message
      </button>
    </div>
  );
};

export default OpenChat;
