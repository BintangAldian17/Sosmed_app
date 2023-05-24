import Posts from "../../models/PostsModel.js";
import jwt from "jsonwebtoken";
import Comments from "../../models/CommentsModel.js";
import Users from "../../models/UsersModel.js";
import multer from "multer"
import Follows from "../../models/Follows.js";
import Likes from "../../models/LikesModel.js"
import { fileURLToPath } from "url"

export const createPost = async (req, res) => {
    const { desc, img } = req.body
    try {
        await Posts.create({
            desc: desc,
            img: img,
            userId: req.id
        })
        res.status(200).json("Create Post Succsessfuly")
    } catch (error) {
        res.status(500).json("something wrong")
    }

}

export const getAllPost = async (req, res) => {
    const limit = parseInt(req.query.limit) || 10
    const page = parseInt(req.query.page) || 0
    const offset = limit * page;
    try {
        const totalRows = await Posts.findAll()
        const totalPage = Math.ceil(totalRows / limit)
        const AllPost = await Posts.findAll({
            include: [{
                model: Users,
                attributes: ['id', 'username', 'avatar']
            }, {
                model: Likes,
                attributes: ['userId']
            }, {
                model: Comments,
                attributes: ['postId']
            }],
            limit: limit,
            offset: offset,
            order: [["createdAt", "DESC"]]
        })
        res.status(200).json(AllPost)
    } catch (error) {
        res.status(500).json(error)
    }
}

export const getDetailPost = async (req, res) => {
    try {
        const id = req.params.id
        const post = await Posts.findByPk(id, {
            include: [{
                model: Users,
                attributes: ['id', 'username', 'avatar']
            }],
        })
        res.status(200).json(post)
    } catch (error) {
        res.status(500).json(error)
    }
}

export const deletePost = async (req, res) => {
    try {
        const postId = req.params.id
        const deletePost = await Posts.destroy({
            where: {
                id: postId,
                userId: req.id
            }
        })
        if (deletePost > 0) {
            return res.status(200).json({ msg: "Post deleted" })
        } else {
            return res.status(403).json({ msg: "You can Delete only your post" })
        }
    } catch (error) {
        res.status(500).json(error)
    }
}

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "uploads")
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}${file.originalname}`)
    }
})

export const upload = multer({ storage: storage })