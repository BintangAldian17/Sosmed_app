import { publicClient } from "../../axios/RequestMethod";
import { useMutation } from "@tanstack/react-query";

const unlikesPost = async (postId) => {
    return await publicClient.delete(`/likes/${postId}`)
}

export const useUnlikePost = ({ ...rest }) => {
    return useMutation(unlikesPost, { ...rest })
}