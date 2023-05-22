import { Fragment, useContext, useRef, useState } from "react";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { BiCommentDetail } from "react-icons/bi";
import { BsFillBookmarkFill, BsThreeDots, BsThreeDotsVertical, BsEmojiSmile } from "react-icons/bs";

import { Dialog, Popover, Transition } from "@headlessui/react";
import { useQueryClient } from "@tanstack/react-query";
import { AuthContext } from "../context-provider/AuthContextProvider";
import { useLikePost } from "../hooks/likePosts/likePost";
import { useUnlikePost } from "../hooks/likePosts/unlikePost";
import DetailPost from "./DetailPost";

const Posts = ({ postImage, id, userInfo, i, likes, totalComments }) => {
  const [modalOption, setModalOption] = useState(false);
  const [modalDetailPost, setModalDetailPost] = useState(false);
  const [detailPostId, setDetailPostId] = useState(Number);
  const [currentUser] = useContext(AuthContext);

  const queryClient = useQueryClient();

  const { mutate: likePost } = useLikePost({
    onSuccess: () => {
      queryClient.invalidateQueries("posts");
    },
  });

  const { mutate: unLikePost } = useUnlikePost({
    onSuccess: () => {
      queryClient.invalidateQueries("posts");
    },
  });

  const closeOptionModal = () => {
    setModalOption(false);
  };

  const openOptionModal = () => {
    setModalOption(true);
  };

  const closeModalDetailPost = () => {
    setModalDetailPost(false);
    reset({
      commentbody: "",
    });
  };

  const openModalDetailPost = () => {
    setDetailPostId(id);
    setModalDetailPost(true);
  };

  const handleLikePost = () => {
    const checkLikes = likes.includes(currentUser.id);
    if (checkLikes) return unLikePost(id);
    return likePost({ postId: id });
  };
  return (
    <div
      className={` w-full break-inside-avoid flex flex-col gap-y-2 ${
        i % 3 === 0 ? " md:aspect-square" : i % 2 === 0 ? " md:h-[320px] " : " md:h-[400px]"
      } h-[400px] bg-[#333333] px-2 rounded-2xl py-3 mb-7 lg:flex-col-reverse`}
      key={i}>
      {/* Post Large screen */}
      <div className=" w-full flex justify-between items-center pl-[2px]">
        <div className=" flex items-center gap-x-2">
          <div className=" w-7 h-7 rounded-full">
            <img
              src={`../../publict/upload/${userInfo?.avatar}`}
              className=" w-full h-full object-cover rounded-full"
            />
          </div>
          <span className=" text-[13px] font-medium">{userInfo.username}</span>
        </div>
        <div className=" lg:hidden block">
          <BsThreeDots />
        </div>
        <div className=" lg:flex items-center gap-x-4 hidden">
          <div className=" flex items-center gap-x-1 justify-center">
            {likes?.includes(currentUser.id) ? (
              <button className=" w-6 h-6" onClick={handleLikePost}>
                <AiFillHeart className=" w-full h-full text-red-600" />
              </button>
            ) : (
              <button className=" w-6 h-6" onClick={handleLikePost}>
                <AiOutlineHeart className=" w-full h-full" />
              </button>
            )}
            <span className=" text-sm font-medium">{likes.length}</span>
          </div>
          <div className=" flex items-center gap-x-1 ">
            {/* Button Post Detail */}
            <button className=" w-5 h-5" onClick={openModalDetailPost}>
              <BiCommentDetail className=" w-full h-full" />
            </button>
            {/* Post Detail */}
            <DetailPost
              modalDetailPost={modalDetailPost}
              closeModalDetailPost={closeModalDetailPost}
              detailPostId={detailPostId}
              handleLikePost={handleLikePost}
              likes={likes}
              currentUser={currentUser}
              id={id}
            />
            <span className=" text-sm font-medium place-items-start">{totalComments.length}</span>
            <button onClick={openOptionModal}>
              <BsThreeDotsVertical />
            </button>
            <Transition appear show={modalOption} as={Fragment}>
              <Dialog as="div" className="relative z-10" onClose={closeOptionModal}>
                <Transition.Child
                  as={Fragment}
                  enter="ease-out duration-300"
                  enterFrom="opacity-0"
                  enterTo="opacity-100"
                  leave="ease-in duration-200"
                  leaveFrom="opacity-100"
                  leaveTo="opacity-0">
                  <div className="fixed inset-0 bg-black bg-opacity-25" />
                </Transition.Child>

                <div className="fixed inset-0 overflow-y-auto">
                  <div className="flex min-h-full items-center justify-center p-4 text-center">
                    <Transition.Child
                      as={Fragment}
                      enter="ease-out duration-300"
                      enterFrom="opacity-0 scale-95"
                      enterTo="opacity-100 scale-100"
                      leave="ease-in duration-200"
                      leaveFrom="opacity-100 scale-100"
                      leaveTo="opacity-0 scale-95">
                      <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                        <Dialog.Title as="h3" className="text-lg font-medium leading-6 text-gray-900">
                          Payment successful
                        </Dialog.Title>
                        <div className="mt-2">
                          <p className="text-sm text-gray-500">
                            Your payment has been successfully submitted. We’ve sent you an email with all of the
                            details of your order.
                          </p>
                        </div>

                        <div className="mt-4">
                          <button
                            type="button"
                            className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                            onClick={closeOptionModal}>
                            Got it, thanks!
                          </button>
                        </div>
                      </Dialog.Panel>
                    </Transition.Child>
                  </div>
                </div>
              </Dialog>
            </Transition>
          </div>
        </div>
      </div>
      <div className=" w-full h-full  overflow-hidden ">
        <img src={`../../publict/upload/${postImage}`} className=" w-full h-full object-cover rounded-lg" />
      </div>
      {/* Posts Mobile Layout*/}
      <div className=" w-full flex justify-between items-center px-1 lg:hidden">
        <div className=" flex items-center gap-x-4">
          <div className=" flex items-center gap-x-1 justify-center">
            {likes?.includes(currentUser.id) ? (
              <button className=" w-6 h-6" onClick={handleLikePost}>
                <AiFillHeart className=" w-full h-full text-red-600" />
              </button>
            ) : (
              <button className=" w-6 h-6" onClick={handleLikePost}>
                <AiOutlineHeart className=" w-full h-full" />
              </button>
            )}
            <span className=" text-sm font-medium">{likes.length}</span>
          </div>
          <div className=" flex items-center gap-x-1 ">
            <button className=" w-5 h-5" onClick={openModalDetailPost}>
              <BiCommentDetail className=" w-full h-full" />
            </button>
            {/* Post Detail */}
            <DetailPost
              modalDetailPost={modalDetailPost}
              closeModalDetailPost={closeModalDetailPost}
              detailPostId={detailPostId}
              handleLikePost={handleLikePost}
              likes={likes}
              currentUser={currentUser}
              id={id}
            />
            <span className=" text-sm font-medium place-items-start">{totalComments.length}</span>
          </div>
        </div>
        <BsFillBookmarkFill />
      </div>
    </div>
  );
};

export default Posts;
