import { publicClient } from "../../axios/RequestMethod"
import { useMutation, useQuery } from "@tanstack/react-query"

const getReplyComment = async ({ postId, commentId }) => {
    const { data } = await publicClient.get(`/posts/${postId}/comment/${commentId}`)
    return data
}

const postReplyComment = async (data) => {
    return await publicClient.post('/reply', data)

}

export const useGetReplyComment = ({ postId, commentId }) => {
    return useQuery(['reply-comment', postId, commentId], () => getReplyComment({ postId, commentId }), {
        enabled: !!postId && !!commentId
    })
}

export const usePostReplyComment = ({ ...rest }) => {
    return useMutation(postReplyComment, { ...rest })
}