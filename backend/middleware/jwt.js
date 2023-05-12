import jwt from "jsonwebtoken"
import dotenv from "dotenv"

dotenv.config({ path: "./.env" })

export const verifyToken = async (req, res, next) => {
    const token = req.cookies.accsessToken

    if (!token) return res.status(401).json("you are not authenticated")

    jwt.verify(token, process.env.SECRET_KEY, async (err, userInfo) => {
        if (err) return res.status(403).json("Token not valid")
        req.id = userInfo.id
        req.username = userInfo.username
        next()
    })
}