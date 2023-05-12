import { publicClient } from "../../axios/RequestMethod";
import { useMutation } from "@tanstack/react-query";

const likesPost = async (data) => {
    return await publicClient.post('/likes', data)
}

export const useLikePost = ({ ...rest }) => {
    return useMutation(likesPost, { ...rest })
}