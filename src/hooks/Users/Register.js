import { publicClient } from "../../axios/RequestMethod";
import { useMutation } from "@tanstack/react-query";

const Register = async (data) => {
    return await publicClient.post('/user/register', data)
}

export const useRegister = ({ ...rest }) => {
    return useMutation(Register, { ...rest })
}