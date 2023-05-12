import React, { useContext, useEffect, useRef, useState } from "react";
import { useGetInbox, useGetLastChat } from "../hooks/Chats/useGetInbox";
import { GetMomment } from "../utils/GetMomment";
import { NavLink } from "react-router-dom";
import { AuthContext } from "../context-provider/AuthContextProvider";
import io from "socket.io-client";
import { ChatContext } from "../context-provider/ChatContext";

const Inbox = ({
  username,
  avatar,
  i,
  userId,
  conversationId,
  handleCurrentChat,
  currentChat,
  refetch,
  message,
  createdAt,
}) => {
  const { data: lastChat } = useGetLastChat({ conversationId: conversationId });
  const [currentUser] = useContext(AuthContext);
  const { onlineUsers, setLastMessage, lastMessage } = useContext(ChatContext);

  return (
    <div
      className={` ${
        currentChat === conversationId ? "bg-[#353535]" : ""
      } w-full flex gap-x-4  px-4 py-2 cursor-pointer  hover:bg-[#353535] transition-all ease-in-out duration-150`}
      key={i}
      onClick={() => {
        handleCurrentChat(conversationId);
        refetch({ conversationId: conversationId });
      }}>
      <div className=" w-14 h-14 rounded-full overflow-hidden">
        <img alt="pic_user" src={`../../publict/upload/${avatar}`} className=" w-full h-full" />
      </div>
      <div className=" flex flex-col flex-grow max-w-full justify-center">
        <h1 className=" font-semibold text-lg">{username}</h1>
        <div className=" flex gap-x-1 items-center">
          <p className=" text-gray-500 text-sm">{message}</p>
          <div className=" text-gray-500 ">.{GetMomment(createdAt)}</div>
        </div>
      </div>
    </div>
  );
};

export default Inbox;
