import Posts from "../../models/PostsModel.js";
import jwt from "jsonwebtoken";

export const createPost = async (req, res) => {
    const token = req.cookies.accsessToken
    const { desc, img } = req.body
    if (!token) return res.status(401).json("Not logged in")
    const userData = jwt.verify(token, process.env.SECRET_KEY)
    try {
        await Posts.create({
            desc: desc,
            img: img,
            userId: userData.id
        })
        res.status(200).json("Create Post Succsessfuly")
    } catch (error) {
        res.status(400).json("something wrong")
    }

}

export const getAllPost = async (req, res) => {
    try {
        const AllPost = await Posts.findAll({
            order: [["createdAt", "DESC"]]
        })
        res.status(200).json(AllPost)
    } catch (error) {
        res.status(400).json(error)
    }
}

export const getDetailPost = async (req, res) => {
    try {
        const id = req.params.id
        const post = await Posts.findByPk(id, {
            attributes: ["id", "title", "desc", "username"]
        })
        res.status(200).json(post)
    } catch (error) {
        res.status(400).json(error)
    }
}

export const deletePost = async (req, res) => {
    const token = req.cookies.accsessToken
    if (!token) return res.status(401).json("Not logged in")
    const userData = jwt.verify(token, process.env.SECRET_KEY)
    try {
        const postId = req.params.id
        const deletePost = await Posts.destroy({
            where: {
                id: postId,
                userId: userData.id
            }
        })
        if (deletePost > 0) {
            return res.status(200).json({ msg: "Post deleted" })
        } else {
            return res.status(403).json({ msg: "You can Delete only your post" })
        }
    } catch (error) {
        res.status(400).json(error)
    }
}