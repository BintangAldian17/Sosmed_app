import { useQuery } from "@tanstack/react-query";
import { publicClient } from "../../axios/RequestMethod";

const getDetailPost = async ({ postId }) => {
    const { data } = await publicClient.get(`/post/${postId}`)
    return data
}

const getComments = async ({ postId }) => {
    const { data } = await publicClient.get(`/comments/${postId}`)
    return data
}

export const useGetDetailPost = ({ postId }) => {
    return (useQuery(['detail-post', postId], () => getDetailPost({ postId }), {
        enabled: !!postId
    }))
}

export const useGetComments = ({ postId }) => {
    return (
        useQuery(['comments', postId], () => getComments({ postId }), {
            enabled: !!postId
        })
    )
}