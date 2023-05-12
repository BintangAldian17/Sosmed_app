import { useQuery } from "@tanstack/react-query";
import { publicClient } from "../../axios/RequestMethod";

const getFindUser = async ({ q }) => {
    const { data } = await publicClient.get(`/users?search=${q}`)
    return data
}

export const useGetFindUser = ({ q }) => {
    return useQuery(['search-query', q], () => getFindUser({ q }), {
        enabled: !!q
    })
}