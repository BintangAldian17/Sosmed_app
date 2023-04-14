import Follows from "../../models/Follows.js";
import jwt from "jsonwebtoken"
import Users from "../../models/UsersModel.js";


export const getFollowers = async (req, res) => {
    const token = req.cookies.accsessToken
    if (!token) return res.status(401).json({ msg: "Not logged in" })
    const userData = jwt.verify(token, process.env.SECRET_KEY)
    try {
        const follows = await Follows.findAll({
            where: {
                followedUserId: userData.id
            }
        });
        const follower = follows.map(e => e.followerUserId)
        const users = await Users.findAll({
            where: {
                id: follower
            },
            attributes: ["id", "username", "avatar"]
        })
        res.status(200).json(users)
    } catch (error) {
        res.status(400).json(error)
    }
}

export const getFolloweds = async (req, res) => {
    const token = req.cookies.accsessToken
    if (!token) return res.status(401).json({ msg: "Not logged in" })
    const userData = jwt.verify(token, process.env.SECRET_KEY)
    try {
        const follows = await Follows.findAll({
            where: {
                followerUserId: userData.id
            }
        });
        const follower = follows.map(e => e.followedUserId)
        const users = await Users.findAll({
            where: {
                id: follower
            },
            attributes: ["id", "username", "avatar"]
        })
        res.status(200).json(users)
    } catch (error) {
        res.status(400).json(error)
    }
}

export const unAndFollow = async (req, res) => {
    const token = req.cookies.accsessToken
    const { userId } = req.body
    if (!token) return res.status(401).json({ msg: "Not logged in" })
    const userData = jwt.verify(token, process.env.SECRET_KEY)
    try {
        const followUser = await Follows.findOne({
            where: {
                followerUserId: userData.id,
                followedUserId: userId
            }
        })

        if (!followUser) {
            await Follows.create({
                followerUserId: userData.id,
                followedUserId: userId
            })
            return res.status(200).json({ msg: "Follow user succsessfuly" })
        } else {
            await followUser.destroy()
            return res.status(200).json({ msg: "Unfollow user succsessfuly" })
        }
    } catch (error) {
        res.status(400).json(error)
    }
}

