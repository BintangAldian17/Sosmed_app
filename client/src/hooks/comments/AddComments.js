import { publicClient } from "../../axios/RequestMethod";
import { useMutation } from "@tanstack/react-query";

const AddComment = async (data) => {
    return await publicClient.post('/comment', data)
}

export const useAddComment = ({ ...rest }) => {
    return useMutation(AddComment, { ...rest })
}