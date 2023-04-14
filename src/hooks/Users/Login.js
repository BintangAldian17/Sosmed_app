import { publicClient } from "../../axios/RequestMethod";
import { useMutation } from "@tanstack/react-query";

const login = async (data) => {
    return await publicClient.post('/user/login', data,)
}

export const useLogin = ({ ...rest }) => {
    return useMutation(login, { ...rest })
}