import { publicClient } from "../../axios/RequestMethod";
import { useMutation } from "@tanstack/react-query"

const Logout = async () => {
    return await publicClient.post('/user/logout')
}

export const useLogout = ({ ...rest }) => {
    return useMutation(Logout, { ...rest })
}