import React, { useContext, useEffect, useRef, useState } from "react";
import { AuthContext } from "../context-provider/AuthContextProvider";
import Inbox from "./Inbox";
import { useLocation } from "react-router-dom";
import { useGetChatParticipan, useGetDetailChat, useGetInbox } from "../hooks/Chats/useGetInbox";
import { ChatContext } from "../context-provider/ChatContext";
import OpenChat from "../pages/OpenChat";
import DetailChat from "../pages/DetailChat";
import { BsEmojiSmile, BsImageFill, BsTelephone } from "react-icons/bs";
import { HiOutlineVideoCamera } from "react-icons/hi";
import { useForm } from "react-hook-form";
import { useSendMessage } from "../hooks/Chats/useSendMessage";
import { useQueryClient } from "@tanstack/react-query";
import { DateNow } from "../utils/DateNow";

const DirectLayout = () => {
  const [currentUser] = useContext(AuthContext);
  const { socket, notification, setNotification } = useContext(ChatContext);
  const [unRead, setUnRead] = useState(false);
  const [currentChat, setCurrentChat] = useState(null);
  const [newMessage, setNewMessage] = useState("");
  const queryClient = useQueryClient();
  const location = useLocation();

  const { data: chatInbox, isLoading: isLoadingChatInbox } = useGetInbox({ currentUserId: currentUser?.id });
  const {
    data: detailChat,
    isLoading: isLoadingDetailChat,
    refetch,
  } = useGetDetailChat({ conversationId: currentChat });
  const { data: participan } = useGetChatParticipan({ conversationId: currentChat });

  const handleCurrentChat = (e) => {
    setCurrentChat(e);
  };

  useEffect(() => {
    if (socket === null) return;
    socket?.on("getMessage", (res) => {
      if (res.conversationId !== currentChat && location.pathname !== "/direct") {
        queryClient.setQueryData(["message-inbox", currentUser.id], (oldData) => {
          console.log(oldData);
          if (!oldData) return null;
          const newData = oldData.map((user) => {
            if (user.conversation.conversationId === res.conversationId) {
              const newConversation = {
                ...user.conversation,
                message: res.message,
                createdAt: DateNow(),
              };
              return {
                ...user,
                conversation: newConversation,
                unRead: true,
              };
            }
            return user;
          });
          const fromat = newData.sort(
            (a, b) => new Date(b.conversation.createdAt) - new Date(a.conversation.createdAt)
          );
          console.log(newData);
          return fromat;
        });
        // setUnRead(true);
      }
      if (res.conversationId === currentChat) {
        queryClient.setQueryData(["detail-chat", currentChat], (oldData) => {
          if (!oldData) {
            return [res];
          }
          return [...oldData, res];
        });
        queryClient.setQueryData(["message-inbox", currentUser.id], (oldData) => {
          if (!oldData) return null;
          const newData = oldData.map((user) => {
            if (user.conversation.conversationId === res.conversationId) {
              const newConversation = {
                ...user.conversation,
                message: res.message,
                createdAt: DateNow(),
              };
              return {
                ...user,
                conversation: newConversation,
                unRead: true,
              };
            }
            return user;
          });
          return newData;
        });
        // setUnRead(false);
      }
      if (location.pathname !== "/direct") return setNotification([res]);
    });
    return () => {
      socket.off("getMessage");
    };
  }, [socket, currentChat, queryClient, notification]);

  const form = useForm({
    defaultValues: {
      message: "",
    },
  });

  const { register, handleSubmit, formState, reset } = form;

  const { mutate: sendMessage } = useSendMessage({
    onSuccess: () => {
      queryClient.invalidateQueries("message-inbox");
      queryClient.invalidateQueries("detail-chat");
      reset({
        message: "",
      });
    },
  });

  useEffect(() => {
    if (socket === null) return;
    socket?.emit("sendMessage", {
      ...newMessage,
      senderId: currentUser.id,
      reciverId: participan?.id,
      conversationId: currentChat,
    });
  }, [newMessage]);

  const handleSendMessage = (message) => {
    setNewMessage(message);
    sendMessage({ ...message, reciverId: participan?.id });
  };

  const lastChatRef = useRef(null);

  useEffect(() => {
    lastChatRef.current?.lastElementChild?.scrollIntoView();
  }, [detailChat]);
  console.log(unRead);

  return (
    <div className="lg:w-[calc(100vw_-_350px)] max-w-full  h-screen ">
      <div className=" w-full h-screen lg:flex bg-[#333333] items-center justify-center">
        <div className=" w-[75%] h-[95%] bg-[#272727] rounded-md flex ">
          <div className="w-full h-full lg:basis-[40%] border-r border-gray-600 flex flex-col">
            <div className=" w-full h-fit overflow-auto flex flex-col">
              {isLoadingChatInbox ? (
                <>
                  <div className=" w-full flex gap-x-4  px-4 pt-4">
                    <div className=" w-16 h-16 rounded-full bg-gray-700 animate-pulse"></div>
                    <div className=" flex flex-col flex-grow gap-y-3 justify-center">
                      <div className=" w-52 h-[15px] bg-gray-700 animate-pulse rounded"></div>
                      <div className=" w-40 h-[15px] bg-gray-700 animate-pulse rounded"></div>
                    </div>
                  </div>
                  <div className=" w-full flex gap-x-4  px-4 pt-4">
                    <div className=" w-16 h-16 rounded-full bg-gray-700 animate-pulse"></div>
                    <div className=" flex flex-col flex-grow gap-y-3 justify-center">
                      <div className=" w-52 h-[15px] bg-gray-700 animate-pulse rounded"></div>
                      <div className=" w-40 h-[15px] bg-gray-700 animate-pulse rounded"></div>
                    </div>
                  </div>
                  <div className=" w-full flex gap-x-4  px-4 pt-4">
                    <div className=" w-16 h-16 rounded-full bg-gray-700 animate-pulse"></div>
                    <div className=" flex flex-col flex-grow gap-y-3 justify-center">
                      <div className=" w-52 h-[15px] bg-gray-700 animate-pulse rounded"></div>
                      <div className=" w-40 h-[15px] bg-gray-700 animate-pulse rounded"></div>
                    </div>
                  </div>
                  <div className=" w-full flex gap-x-4  px-4 pt-4">
                    <div className=" w-16 h-16 rounded-full bg-gray-700 animate-pulse"></div>
                    <div className=" flex flex-col flex-grow gap-y-3 justify-center">
                      <div className=" w-52 h-[15px] bg-gray-700 animate-pulse rounded"></div>
                      <div className=" w-40 h-[15px] bg-gray-700 animate-pulse rounded"></div>
                    </div>
                  </div>
                </>
              ) : (
                <>
                  <div className=" w-full flex justify-center items-center h-16 border-b border-[#464545]">
                    <h1 className=" text-xl font-semibold pb-2">{currentUser?.username}</h1>
                  </div>
                  {chatInbox?.map((e, i) => {
                    console.log(e.conversation.conversationId);
                    return (
                      <Inbox
                        read={e.unRead}
                        currentUser={currentUser}
                        participan={participan}
                        refetch={refetch}
                        avatar={e.avatar}
                        key={i}
                        createdAt={e.conversation.createdAt}
                        message={e.conversation.message}
                        username={e.username}
                        userId={e.id}
                        handleCurrentChat={handleCurrentChat}
                        conversationId={e.conversation.conversationId}
                        isLoadingDetailChat={isLoadingDetailChat}
                        currentChat={currentChat}
                      />
                    );
                  })}
                </>
              )}
            </div>
          </div>
          <div className="w-full max-h-full h-full lg:basis-[60%] border-slate-300 flex flex-col">
            {currentChat === null ? (
              <OpenChat />
            ) : (
              <div
                className={`w-full h-full flex flex-col ${
                  isLoadingDetailChat ? " justify-between items-center" : ""
                } `}>
                <div className=" h-16 w-full border-b border-gray-600 flex items-center px-3 justify-between">
                  <div className=" flex items-center gap-x-3">
                    <div className=" w-7 h-7 overflow-hidden rounded-full">
                      <img
                        alt="user_pic"
                        src={`../../publict/upload/${participan?.avatar}`}
                        className=" w-full h-full"
                      />
                    </div>
                    <h1>{participan?.username}</h1>
                  </div>
                  <div className=" flex gap-x-3 items-center">
                    <BsTelephone className=" w-6 h-6" />
                    <HiOutlineVideoCamera className=" w-8 h-8" />
                  </div>
                </div>
                {isLoadingDetailChat ? (
                  "loading"
                ) : (
                  <div className=" flex flex-col  w-full h-full justify-end lg:h-[calc(100vh_-_160px)] pb-7 pt-2 ">
                    <div className="w-full h-fit flex flex-col items-start px-4 overflow-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:'none'] [scrollbar-width:'none'] gap-y-5">
                      {detailChat?.map((e, i) => {
                        return (
                          <DetailChat
                            chatId={e.id}
                            key={i}
                            conversationId={e.conversationId}
                            user={e.user}
                            senderId={e.senderId}
                            message={e.message}
                            currentUser={currentUser}
                            lastChatRef={lastChatRef}
                            participan={participan}
                          />
                        );
                      })}
                    </div>
                  </div>
                )}
                <div className=" w-full h-fit px-5 flex justify-center items-center mb-4">
                  <div className="px-5 w-full h-10 rounded-full bg-[#333333] shadow-xl flex items-center gap-x-4">
                    <div className=" h-6 w-6">
                      <BsEmojiSmile className=" w-full h-full" />
                    </div>
                    <form className=" w-full h-fit flex-wrap" onSubmit={handleSubmit(handleSendMessage)}>
                      <input
                        className=" outline-none px-1 w-full h-full bg-transparent"
                        {...register("message", {
                          required: true,
                        })}
                        autoComplete="off"
                        type="text"
                      />
                    </form>
                    <div className=" h-6 w-6">
                      <BsImageFill className=" w-full h-full text-slate-300" />
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DirectLayout;
