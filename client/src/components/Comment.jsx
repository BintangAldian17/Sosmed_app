import React, { useContext } from "react";
import { GetMomment } from "../utils/GetMomment";
import { useGetReplyComment } from "../hooks/reply-comment/useGetReplyComment";
import { AuthContext } from "../context-provider/AuthContextProvider";

export const Comment = ({ avatar, username, createdAt, text, i, detailPostId, id, setCommentId, userId }) => {
  const [currentUser] = useContext(AuthContext);
  console.log(currentUser.id, userId);
  const { data: replyComment } = useGetReplyComment({ postId: detailPostId, commentId: id });
  console.log(replyComment);
  return (
    <div className=" flex gap-x-4 items-start w-full h-fit" key={i}>
      <div className=" w-8 h-8 rounded-full overflow-hidden">
        <img src={`../../publict/upload/${avatar}`} alt="avatar-user" className=" w-full h-full object-cover" />
      </div>
      <div className=" flex flex-grow flex-col gap-y-2 h-fit">
        <span className=" text-sm font-bold">
          {username} <span className=" text-slate-300 font-normal text-base">{text}</span>
        </span>
        <div className=" flex gap-x-3 text-xs">
          <span>{GetMomment(createdAt)}</span>
          {currentUser?.id !== userId ? (
            <button className="" onClick={() => setCommentId(id)}>
              reply
            </button>
          ) : null}
        </div>
        {replyComment?.length
          ? replyComment?.map((el, i) => {
              return (
                <div className=" w-full h-fit flex flex-col mt-3">
                  <div className=" flex gap-x-4 items-start w-full h-fit" key={i}>
                    <div className=" w-7 h-7 rounded-full overflow-hidden">
                      <img
                        src={`../../publict/upload/${el?.user?.avatar}`}
                        alt="avatar-user"
                        className=" w-full h-full object-cover"
                      />
                    </div>
                    <div className=" flex flex-grow flex-col gap-y-2 h-fit">
                      <span className=" text-sm font-bold">
                        {el?.user?.username}{" "}
                        <span className=" text-slate-300 font-normal text-base">{el?.replyBody}</span>
                      </span>
                    </div>
                  </div>
                </div>
              );
            })
          : null}
      </div>
    </div>
  );
};
