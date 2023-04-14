import axios from "axios"

const BASE_URL = "http://localhost:5000/"

export const publicClient = axios.create({
    baseURL: BASE_URL,
    withCredentials: true,

})