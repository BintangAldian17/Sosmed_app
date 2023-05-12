import { publicClient } from "../../axios/RequestMethod";
import { useQuery } from "@tanstack/react-query";

const getPosts = async () => {
    const { data } = await publicClient.get('/posts')
    return data
}

const getLikesPost = async (postsId) => {
    const { data } = await publicClient.get(`/likes?postId=${postsId}`)
    return data
}

export const useGetLikesPost = ({ postsId }) => {
    return useQuery(['likes', postsId], () => getLikesPost({ postsId }), {
        enabled: !!postsId
    })
}

export const useGetPosts = () => {
    return useQuery(['posts'], getPosts)
}