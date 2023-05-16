import Comments from "../../models/CommentsModel.js";
import Posts from "../../models/PostsModel.js";
import ReplyComments from "../../models/ReplyComments.js"
import Users from "../../models/UsersModel.js";

export const getAllReplyComments = async (req, res) => {
    try {
        const { postId, commentId } = req.params
        const replyComment = await ReplyComments.findAll({
            where: {
                postId: postId,
                commentId: commentId
            },
            include: {
                model: Users,
                attributes: ['id', 'username', 'avatar']
            }
        })
        res.status(200).json(replyComment)
    } catch (error) {
        res.status(500).json(error)
    }
}

export const sentReplyComment = async (req, res) => {
    const { replyBody, commentId, postId } = req.body;
    try {
        await ReplyComments.create({
            replyBody: replyBody,
            postId: postId,
            commentId: commentId,
            userId: req.id
        })
        res.status(200).json({ msg: "Reply comment sent succsessfuly" })
    } catch (error) {
        res.status(500).json(error)
    }
}