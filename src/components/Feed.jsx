import { useEffect, useState } from "react";
import Navbar from "./Navbar";
import { generateFakeUsers } from "../utils/generateFakeUser";
import Stories from "./Stories";
import { BsFillPlayFill } from "react-icons/bs";
import image from "../assets/Dummy.jpg";

const Feed = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const loadData = generateFakeUsers(20);
    setData(loadData);
  }, []);

  return (
    <div className=" flex-grow h-screen bg-[#2e2f3a] lg:rounded-tl-xl lg:rounded-bl-xl flex lg:justify-center lg:items-center ">
      <div className=" lg:w-[85%] lg:h-full w-full lg:pt-4 flex flex-col lg:gap-y-6">
        <div className=" w-full flex flex-col h-fit md:gap-y-6 gap-y-3 lg:pt-0 lg:pb-0 md:pt-8 md:pb-4 pt-3 pb-2 lg:px-0 md:px-7 px-4">
          <Navbar />
          <div className=" w-full flex flex-col h-fit lg:gap-y-4 ">
            <div className=" w-full lg:flex justify-between items-center hidden">
              <h1 className=" text-xl font-bold gap-y-5">Stories</h1>
              <div className=" h-full w-fit flex gap-x-6 justify-center items-center">
                <div className="  w-8 h-8 border-2 border-dotted rounded-full flex justify-center items-center">
                  <BsFillPlayFill className=" w-4 h-5" />
                </div>
                <h1 className=" text-lg font-medium">Watch all</h1>
              </div>
            </div>
            <div className=" max-w-full px-1 flex flex-row md:gap-x-7 gap-x-5 overflow-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:'none'] [scrollbar-width:'none'] py-2">
              {/* <img
                    className=" lg:w-[83px] lg:h-[83px] md:w-[110px] md:h-[110px] w-[60px] h-[60px]  p-1 rounded-full ring-2 ring-red-500 object-cover"
                    src={image}
                    alt="Bordered avatar"
                /> */}
              {data?.map((stories, i) => {
                return <Stories avatar={stories?.avatar} key={i} />;
              })}
            </div>
          </div>
        </div>
        <div className=" w-full lg:grid-cols-3 flex flex-col bg-[#1a1b21] flex-grow h-full lg:bg-transparent">
          <div className=""></div>
        </div>
      </div>
    </div>
  );
};

export default Feed;
