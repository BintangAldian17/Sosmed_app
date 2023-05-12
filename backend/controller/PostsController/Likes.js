import { where } from "sequelize";
import Likes from "../../models/LikesModel.js";

export const likePosts = async (req, res) => {
    const { postId } = req.body
    const findLike = await Likes.findOne({ where: { userId: req.id, postId: postId } })
    if (findLike) return res.status(400).json('you already like a post')
    try {
        await Likes.create({
            userId: req.id,
            postId: postId
        })
        res.status(200).json('Like post successfuly')
    }
    catch (error) {
        res.status(500).json(error)
    }

}

export const unlikePost = async (req, res) => {
    const id = req.params.id
    try {
        const findLike = await Likes.findOne({ where: { userId: req.id, postId: id } })
        if (!findLike) return res.status(400).json("you haven't liked this post")
        await findLike.destroy()
        return res.status(200).json('unlike post successfuly')
    } catch (error) {
        return res.status(500).json(error)
    }

}

export const getLikesPost = async (req, res) => {
    const postId = req.query.postId
    try {
        const likePost = await Likes.findAll({
            where: {
                postId: postId
            }
        })
        return res.status(200).json(likePost.map(like => like.userId))
    } catch (error) {
        console.log(error);
        return res.status(500).json(error)
    }
} 