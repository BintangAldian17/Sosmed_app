import Comments from "../../models/CommentsModel.js";



export const getCommentPost = async (req, res) => {
    try {
        const postId = req.params.postId
        const comments = await Comments.findAll({
            where: {
                postId: postId
            }
        })
        res.status(200).json(comments)
    } catch (error) {
        res.status(400).json(error)
    }

}

export const postComment = async (req, res) => {
    try {
        const postId = req.params.postId
        const { commentbody } = req.body
        await Comments.create({
            commentbody: commentbody,
            postId: postId
        })
        res.status(200).json({ msg: "Comment sent successfully" })
    } catch (error) {
        res.status(400).json(error)
    }
}

export const deleteComment = async (req, res) => {
    try {
        const commentId = req.params.commentId
        await Comments.destroy({
            where: {
                id: commentId
            }
        })
        res.status(200).json({ msg: "Delete comment" })
    } catch (error) {
        res.status(400).json(error)
    }
}