import { publicClient } from "../../axios/RequestMethod";
import { useMutation } from "@tanstack/react-query";

const sendMessage = async (data) => {
    return publicClient.post('/conversation', data)
}

const sendPersonalMessage = async (data) => {
    return publicClient.post('/chat', data)
}

export const useSendMessage = ({ ...rest }) => {
    return useMutation(sendMessage, { ...rest })
}

export const useSendPersonalMessage = ({ ...rest }) => {
    return useMutation(sendPersonalMessage, { ...rest })
}