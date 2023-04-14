import Comments from "../../models/CommentsModel.js";
import Posts from "../../models/PostsModel.js";
import ReplyComments from "../../models/ReplyComments.js"

export const getAllReplyComments = async (req, res) => {
    try {
        const { postId, commentId } = req.params
        const replyComment = await ReplyComments.findAll({
            where: {
                postId: postId,
                commentId: commentId
            }
        })
        res.status(200).json(replyComment)
    } catch (error) {
        res.status(400).json(error)
    }
}

export const sentReplyComment = async (req, res) => {
    const { replyBody } = req.body;
    const { postId, commentId } = req.params
    try {
        await ReplyComments.create({
            replyBody: replyBody,
            postId: postId,
            commentId: commentId
        })
        res.status(200).json({ msg: "Reply comment sent succsessfuly" })
    } catch (error) {
        res.status(400).json(error)
    }
}