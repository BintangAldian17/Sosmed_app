import React, { useContext, useEffect, useRef, useState } from "react";
import { useGetChatParticipan, useGetDetailChat, useGetInbox } from "../hooks/Chats/useGetInbox";
import { useParams, useOutletContext } from "react-router-dom";
import io from "socket.io-client";
import { AuthContext } from "../context-provider/AuthContextProvider";
import { BsEmojiSmile, BsImageFill, BsTelephone } from "react-icons/bs";
import { HiOutlineVideoCamera } from "react-icons/hi";
import FadeLoader from "react-spinners/FadeLoader";
import { useSendMessage } from "../hooks/Chats/useSendMessage";
import { useForm } from "react-hook-form";
import { useQueryClient } from "@tanstack/react-query";
import { ChatContext } from "../context-provider/ChatContext";

const DetailChat = ({
  chatId,
  conversationId,
  user,
  senderId,
  i,
  message,
  isLoadingDetailChat,
  participan,
  currentUser,
  lastChatRef,
}) => {
  // const [currentUser] = useContext(AuthContext);
  // const [arrivalMessage, setArrivalMessage] = useState([]);
  // const { socket, newMessage, setNewMessage, setLastMessage, lastMessage } = useContext(ChatContext);

  // const { id } = useParams();

  // const lastChatRef = useRef(null);

  const form = useForm({
    defaultValues: {
      message: "",
    },
  });

  const { register, handleSubmit, formState, reset } = form;

  const queryClient = useQueryClient();

  // const { data: participan } = useGetChatParticipan({ conversationId: id });
  // const { data: allMessage, isLoading: isLoadingDetailChat, isSuccess } = useGetDetailChat({ conversationId: id });
  // useEffect(() => {
  //   if (allMessage) {
  //     setArrivalMessage(allMessage);
  //   }
  // }, [allMessage]);

  const { mutate: sendMessage } = useSendMessage({
    onSuccess: () => {
      queryClient.invalidateQueries("");
      queryClient.invalidateQueries("detail-chat");
      reset({
        message: "",
      });
    },
  });

  // useEffect(() => {
  //   if (socket === null) return;
  //   socket?.emit("sendMessage", {
  //     ...newMessage,
  //     senderId: currentUser.id,
  //     reciverId: participan?.id,
  //     conversationId: id,
  //   });
  // }, [newMessage]);

  // useEffect(() => {
  //   if (socket === null) return;
  //   socket?.on("getMessage", (res) => {
  //     if (res.conversationId !== id) return;
  //     setArrivalMessage([...arrivalMessage, res]);
  //   });
  //   return () => {
  //     socket.off("getMessage");
  //   };
  // }, [socket, id, arrivalMessage]);

  const handleSendMessage = (message) => {
    sendMessage({ ...message, reciverId: participan?.id });
  };

  return (
    <div
      className={` w-full flex ${currentUser.id === senderId ? " justify-end" : " justify-start gap-x-2"} ${
        message === undefined ? "hidden" : ""
      }`}
      key={i}
      ref={lastChatRef}>
      {currentUser.id !== senderId ? (
        <div className=" w-6 h-6 overflow-hidden rounded-full self-end">
          <img alt="user_pic" src={`../../publict/upload/${participan?.avatar}`} className=" w-full h-full" />
        </div>
      ) : null}
      <div
        className={` w-fit max-w-[50%] flex flex-wrap py-2 px-3  rounded-tl-xl  rounded-tr-xl${
          currentUser.id === senderId
            ? " justify-end rounded-bl-xl bg-slate-700"
            : " justify-start rounded-br-xl bg-slate-300 text-gray-900"
        }`}>
        {message}
      </div>
    </div>
  );
};

export default DetailChat;
