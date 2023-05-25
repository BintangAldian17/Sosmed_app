import { publicClient } from "../../axios/RequestMethod";
import { useQuery } from "@tanstack/react-query";

const getInbox = async () => {
    const { data } = await publicClient.get(`/conversation`)
    return data
}

const getLastChat = async ({ conversationId }) => {
    const { data } = await publicClient.get(`/chat/${conversationId}`)
    return data
}

const getDetailChat = async ({ conversationId }) => {
    const { data } = await publicClient.get(`conversation/${conversationId}`)
    return data
}

const getChatParticipan = async ({ conversationId }) => {
    const { data } = await publicClient.get(`chats/${conversationId}`)
    return data
}

export const useGetInbox = () => {
    return useQuery(['message-inbox'], getInbox)
}

export const useGetLastChat = ({ conversationId }) => {
    return useQuery(['last-chat', conversationId], () => getLastChat({ conversationId }), {
        enabled: !!conversationId
    })
}

export const useGetDetailChat = ({ conversationId }) => {
    return useQuery(['detail-chat', conversationId], () => getDetailChat({ conversationId }), {
        enabled: !!conversationId
    })
}

export const useGetChatParticipan = ({ conversationId }) => {
    return useQuery(['participan', conversationId], () => getChatParticipan({ conversationId }), {
        enabled: !!conversationId
    })
}