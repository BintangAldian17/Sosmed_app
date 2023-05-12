import { publicClient } from "../../axios/RequestMethod";
import { useMutation } from "@tanstack/react-query";

const sendMessage = async (data) => {
    return publicClient.post('/conversation', data)
}

export const useSendMessage = ({ ...rest }) => {
    return useMutation(sendMessage, { ...rest })
}