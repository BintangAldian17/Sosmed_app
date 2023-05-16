import { useEffect, useState, useContext } from "react";
import Navbar from "../components/Navbar";
import { generateFakeUsers, generatePostsUser } from "../utils/generateFakeUser";
import Stories from "../components/Stories";
import { AuthContext } from "../context-provider/AuthContextProvider";
import { useGetPosts } from "../hooks/posts/GetPosts";

import { BsFillPlayFill } from "react-icons/bs";
import avatarUser from "../assets/user.png";
import Posts from "../components/Posts";
import { ChatContext } from "../context-provider/ChatContext";
const Feed = () => {
  const { notification } = useContext(ChatContext);
  const [currentUser] = useContext(AuthContext);
  const [data, setData] = useState([]);
  const [posts, setPosts] = useState([]);

  const { data: post, isLoading, isError } = useGetPosts();

  console.log(notification);

  useEffect(() => {
    const loadData = generateFakeUsers(20);
    setData(loadData);
  }, []);

  useEffect(() => {
    const loadData = generatePostsUser(20);
    setPosts(loadData);
  }, []);

  return (
    <div className=" lg:w-[calc(100vw_-_350px)] max-w-full  h-screen bg-[#2f2e2e] lg:rounded-tl-xl lg:rounded-bl-xl flex lg:justify-center lg:items-center shadow-xl">
      <div className=" lg:max-w-[88%] lg:h-full w-full lg:pt-4 flex flex-col lg:gap-y-5">
        <div className=" w-full flex flex-col h-fit md:gap-y-6 gap-y-1 lg:pt-0 lg:pb-0 md:pt-8 md:pb-4 pt-1 pb-1 lg:px-0 md:px-7 px-4">
          <Navbar />
          <div className=" w-full flex flex-col h-fit lg:gap-y-4 overflow-auto">
            <div className=" w-full lg:flex justify-between items-center hidden">
              <h1 className=" text-xl font-bold gap-y-5">Stories</h1>
              <div className=" h-full w-fit flex gap-x-6 justify-center items-center">
                <div className="  w-8 h-8 border-2 border-dotted rounded-full flex justify-center items-center">
                  <BsFillPlayFill className=" w-4 h-5" />
                </div>
                <h1 className=" text-lg font-medium">Watch all</h1>
              </div>
            </div>
            <div className=" px-[5px] max-w-full lg:gap-x-5 md:gap-x-7 gap-x-5 overflow-x-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:'none'] [scrollbar-width:'none'] py-2 grid grid-flow-col">
              <div className="  lg:w-[83px] lg:h-[83px] md:w-[110px] md:h-[110px] w-[60px] h-[60px]  p-1 rounded-full ring-2 ring-slate-500 object-cover bg">
                <img
                  className="w-full h-full object-cover rounded-full"
                  src={`../../publict/upload/${currentUser.avatar}`}
                  alt="Bordered avatar"
                />
              </div>
              {data?.map((stories, i) => {
                return <Stories avatar={stories?.avatar} key={i} />;
              })}
            </div>
          </div>
        </div>
        <div className=" w-full h-full flex flex-col gap-y-2">
          <div className=" w-full justify-between items-center lg:flex hidden">
            <h1 className=" text-2xl font-semibold">Feed</h1>
            <div className=" flex items-center justify-center gap-x-5">
              <h1 className=" text-lg font-semibold ">Latest</h1>
              <h1 className=" text-lg font-semibold text-slate-600">Popular</h1>
            </div>
          </div>
          <div className=" max-w-full lg:h-[calc(100vh_-_300px)] md:h-[calc(100vh_-_245px)] h-[calc(100vh_-_138px)] overflow-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:'none'] [scrollbar-width:'none'] rounded-md lg:px-0 px-2 bg-[#1a1b21] lg:pt-0 lg:bg-transparent pt-3">
            <div className=" max-w-full h-fit overflow-auto lg:columns-3 md:columns-2 ">
              {post?.map((e, i) => {
                return (
                  <Posts
                    postImage={e.img}
                    key={i}
                    id={e.id}
                    i={i}
                    userInfo={e?.user}
                    likes={e?.likes.map((e) => e.userId)}
                    totalComments={e?.comments.map((e) => e.postId)}
                  />
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Feed;
