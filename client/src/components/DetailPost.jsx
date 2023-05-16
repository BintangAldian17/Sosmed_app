import { Dialog, Transition } from "@headlessui/react";
import { React, Fragment, useState, useRef } from "react";
import { BsEmojiSmile, BsFillBookmarkFill, BsThreeDots } from "react-icons/bs";
import { GetMomment } from "../utils/GetMomment";
import { TiArrowBack } from "react-icons/ti";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { BiCommentDetail } from "react-icons/bi";
import { useQueryClient } from "@tanstack/react-query";
import { useAddComment } from "../hooks/comments/AddComments";
import placeholderLoading from "../assets/placeholder_loading.png";
import { useForm } from "react-hook-form";
import { useGetComments, useGetDetailPost } from "../hooks/posts/GetDetailPost";
import userPic from "../assets/user.png";
import EmojiPicker, { Emoji, EmojiStyle } from "emoji-picker-react";
import { Comment } from "./Comment";
import { usePostReplyComment } from "../hooks/reply-comment/useGetReplyComment";

const DetailPost = ({ likes, currentUser, modalDetailPost, closeModalDetailPost, detailPostId, handleLikePost }) => {
  const [selectedEmoji, setSelectedEmoji] = useState("");
  const [showEmoji, setShowEmoji] = useState(false);
  const [commentId, setCommentId] = useState(null);
  console.log(commentId);

  const ref = useRef(null);

  const form = useForm();

  const { register, handleSubmit, formState, reset } = form;

  const { data: detailPost, isLoading: isLoadingDetailPost } = useGetDetailPost({ postId: detailPostId });

  const { data: comments, isLoading: isLoadingComments } = useGetComments({ postId: detailPostId });

  const queryClient = useQueryClient();

  const { mutate: postComment } = useAddComment({
    onSuccess: () => {
      queryClient.invalidateQueries("comments");
      queryClient.invalidateQueries("posts");
      reset({
        commentbody: "",
      });
    },
  });

  const { mutate: postReplyComment } = usePostReplyComment({
    onSuccess: () => {
      queryClient.invalidateQueries("reply-comment");
      queryClient.invalidateQueries("comments");
      reset({
        replyBody: "",
      });
    },
  });

  const handleAddComment = (data) => {
    console.log(data);
    if (commentId === null) return postComment({ ...data, postId: detailPostId });
    return postReplyComment({ ...data, postId: detailPostId, commentId: commentId });
  };

  return (
    <Transition appear show={modalDetailPost} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={closeModalDetailPost}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0">
          <div className="fixed inset-0 bg-black/60" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto text-slate-300">
          <div className="flex h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95">
              <Dialog.Panel className="w-full max-w-[70%] flex transform overflow-hidden rounded-sm text-left align-middle shadow-xl transition-all h-[90%] bg-[#272727]">
                <div className=" w-full h-full flex ">
                  {/* Image Detail Post */}
                  <div className=" w-[50%]">
                    {isLoadingDetailPost ? (
                      <div className=" w-full h-full bg-[#1f2127]"></div>
                    ) : (
                      <img src={`../../publict/upload/${detailPost?.img}`} className=" w-full h-full object-cover " />
                    )}
                  </div>
                  <div className=" w-full max-w-[50%] ">
                    {/*  Post User */}
                    <div className=" w-full flex flex-col justify-between h-full">
                      <div className=" w-full flex flex-col">
                        {isLoadingDetailPost ? (
                          <div className=" w-full flex border-b border-gray-700 p-3 items-center gap-x-3">
                            <div className=" w-9 h-9 bg-gray-600 rounded-full animate-pulse"></div>
                            <div className=" flex-grow h-5 rounded bg-gray-600 animate-pulse"></div>
                          </div>
                        ) : (
                          <div className=" flex w-full justify-between border-b border-gray-700 p-3 items-center">
                            <div className=" flex gap-x-3 items-center">
                              <div className=" w-9 h-9 rounded-full overflow-hidden">
                                <img
                                  src={`../../publict/upload/${detailPost?.user?.avatar}`}
                                  alt="avatar-user"
                                  className=" w-full h-full object-cover"
                                />
                              </div>
                              <span className=" text-[15px] font-bold">{detailPost?.user?.username}</span>
                            </div>
                            <button className=" w-5 h-5">
                              <BsThreeDots className=" w-full h-full" />
                            </button>
                          </div>
                        )}
                        {/* Desc and Comment */}
                        <div className=" w-full h-fit p-3 flex flex-col overflow-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:'none'] [scrollbar-width:'none'] lg:h-[calc(100vh_-_319px)] gap-y-4 ">
                          <div className=" flex gap-x-4 items-start h-fit w-full">
                            <div className=" w-8 h-8 rounded-full overflow-hidden">
                              <img
                                src={`../../publict/upload/${detailPost?.user?.avatar}`}
                                alt="avatar-user"
                                className=" w-full h-full object-cover"
                              />
                            </div>
                            <div>
                              <span className="text-sm font-bold">{detailPost?.user?.username}</span>{" "}
                              <span className="text-slate-300 font-normal text-base">{detailPost?.desc}</span>
                            </div>
                          </div>
                          {/* Comment section  */}
                          {isLoadingComments
                            ? null
                            : comments?.results?.map((el, i) => {
                                return (
                                  <Comment
                                    id={el?.id}
                                    avatar={el?.user?.avatar}
                                    username={el?.user?.username}
                                    createdAt={el?.createdAt}
                                    text={el?.commentbody}
                                    i={i}
                                    userId={el?.user?.id}
                                    detailPostId={detailPostId}
                                    setCommentId={setCommentId}
                                  />
                                );
                              })}{" "}
                        </div>
                      </div>
                      {/* Detail Post Feture */}
                      {isLoadingDetailPost ? (
                        <div className=" w-full h-52 flex border-t border-gray-700 flex-col gap-y-2 pt-9 pl-5 animate-pulse">
                          <div className=" w-32 h-4 rounded  bg-gray-600"></div>
                          <div className=" w-52 h-4 rounded  bg-gray-600"></div>
                          <div className=" w-32 h-4 rounded  bg-gray-600"></div>
                        </div>
                      ) : (
                        <div className=" w-full flex-col h-fit border-t border-gray-700">
                          <div className=" w-full flex flex-col px-4 py-2">
                            <div className=" w-full flex justify-between items-center">
                              <div className=" flex gap-x-3 items-center">
                                <button className=" w-7 h-7">
                                  {likes?.includes(currentUser.id) ? (
                                    <button className=" w-6 h-6" onClick={handleLikePost}>
                                      <AiFillHeart className=" w-full h-full text-red-600" />
                                    </button>
                                  ) : (
                                    <button className=" w-6 h-6" onClick={handleLikePost}>
                                      <AiOutlineHeart className=" w-full h-full" />
                                    </button>
                                  )}
                                </button>
                                <button className=" w-6 h-6">
                                  <BiCommentDetail className=" w-full h-full" />
                                </button>
                              </div>
                              <button className=" w-5 h-6">
                                <BsFillBookmarkFill className=" w-full h-full" />
                              </button>
                            </div>
                            <div className=" w-full pt-2 flex flex-col">
                              <p className=" font-semibold text-lg">
                                {likes.length} <span className=" text-sm font-bold">Likes</span>
                              </p>
                              <span className=" text-[11px] uppercase">1 hari yang lalu</span>
                            </div>
                          </div>
                          <div className=" w-full flex gap-x-2 border-t border-gray-700 items-center p-4">
                            <button className=" w-6 h-6 ">
                              <BsEmojiSmile className=" w-full h-full" />
                            </button>
                            {commentId ? (
                              <button onClick={() => setCommentId(null)}>
                                <TiArrowBack />
                              </button>
                            ) : null}
                            {/* Add Comment */}
                            <form className=" w-full flex gap-x-2" onSubmit={handleSubmit(handleAddComment)}>
                              {commentId !== null ? (
                                <input
                                  type="text"
                                  className=" w-full px-2 bg-transparent outline-none placeholder:text-sm"
                                  placeholder="Reply Comment..."
                                  {...register("replyBody", {
                                    required: true,
                                  })}
                                  autoComplete="off"
                                  // ref={ref}
                                />
                              ) : (
                                <input
                                  type="text"
                                  className=" w-full px-2 bg-transparent outline-none placeholder:text-sm"
                                  placeholder="Add Comment..."
                                  {...register("commentbody", {
                                    required: true,
                                  })}
                                  autoComplete="off"
                                  // ref={ref}
                                />
                              )}

                              <button
                                className={` text-base disabled:text-red-300 text-red-500
                                       `}
                                // disabled={!isDirty || !isValid}
                                onClick={handleSubmit(handleAddComment)}>
                                Send
                              </button>
                            </form>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

export default DetailPost;
