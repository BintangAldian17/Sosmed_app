import Comments from "../../models/CommentsModel.js";
import Users from "../../models/UsersModel.js";



export const getCommentPost = async (req, res) => {
    const postId = req.params.id
    const limit = parseInt(req.query.limit) || 10
    const page = parseInt(req.query.page) || 0
    const offset = limit * page;
    try {
        const totalRows = await Comments.count({
            where: {
                postId: postId
            }
        })
        const totalPage = Math.ceil(totalRows / limit)
        const results = await Comments.findAll({
            include: {
                model: Users,
                attributes: ['id', 'username', 'avatar']
            },
            where: {
                postId: postId
            },
            order: [["createdAt", "DESC"]],
            limit: limit,
            offset: offset
        })
        res.status(200).json(
            {
                results: results,
                page: page,
                limit: limit,
                totalRows: totalRows,
                totalPage: totalPage
            }
        )
    } catch (error) {
        res.status(400).json(error)
    }

}

export const postComment = async (req, res) => {
    try {
        const { commentbody, postId } = req.body
        await Comments.create({
            commentbody: commentbody,
            postId: postId,
            userId: req.id
        })
        res.status(200).json({ msg: "Comment sent successfully" })
    } catch (error) {
        res.status(400).json(error)
    }
}

export const deleteComment = async (req, res) => {
    try {

        const { commentId, postId } = req.params
        const deleteComment = await Comments.destroy({
            where: {
                id: commentId,
                userId: req.id,
                postId
            }
        })
        if (deleteComment > 0) {
            return res.status(200).json({ msg: "Delete comment" })
        } else {
            return res.status(403).json("you can delete onlu your comments")
        }
    } catch (error) {
        res.status(400).json(error)
    }
}