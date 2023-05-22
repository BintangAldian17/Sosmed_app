import axios from "axios"

const BASE_URL = "https://sosmedapp-production.up.railway.app"

export const publicClient = axios.create({
    baseURL: BASE_URL,
    withCredentials: true,

})