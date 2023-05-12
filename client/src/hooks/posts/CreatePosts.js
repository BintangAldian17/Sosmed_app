import { publicClient } from "../../axios/RequestMethod";
import { useMutation } from "@tanstack/react-query";

const createPosts = async (data) => {
    return await publicClient.post('/posts', data)
}

const uploadPostImage = async (formData) => {
    return await publicClient.post('/posts/upload', formData)
}

export const useCreatePosts = ({ ...rests }) => {

    return useMutation(createPosts, { ...rests })
}

export const useUploadPostImage = ({ ...rests }) => {
    return useMutation(uploadPostImage, { ...rests })
}