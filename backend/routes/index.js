import express from "express"
import { createPost, getAllPost, getDetailPost, deletePost, upload } from "../controller/PostsController/Posts.js"
import { getCommentPost, postComment, deleteComment } from "../controller/PostsController/Comments.js"
import { getAllReplyComments, sentReplyComment } from "../controller/PostsController/ReplyComments.js"
import { Register, findUser, Login, Logout } from "../controller/UsersController/Users.js"
import { getFolloweds, getFollowers, unAndFollow } from "../controller/UsersController/UsersFeature.js"
import { getLikesPost, likePosts, unlikePost } from "../controller/PostsController/Likes.js"
import { verifyToken } from "../middleware/jwt.js"
import { getAllConversation, getConversation, getDetailParticipan, getLastConversation, sendMessage } from "../controller/UsersController/Chat.js"
const router = express.Router()

// API for Posts
router.get("/posts", getAllPost)
router.post("/posts", verifyToken, createPost)
router.get("/post/:id", getDetailPost)
router.delete("/posts/:id", verifyToken, deletePost)
// upload img
router.post('/posts/upload', upload.single('file'), (req, res) => {
    const file = req.file;
    res.status(200).json(file.filename)
})

router.get("/hello-world", (req, res) => {
    res.json("Hello world test!")
})

// API for comment on posts
router.get("/comments/:id", getCommentPost)
router.post("/comment", verifyToken, postComment)
router.delete("/posts/:postId/comments/:commentId", verifyToken, deleteComment)

// API for reply comment on posts
router.get("/posts/:postId/comment/:commentId", getAllReplyComments)
router.post("/reply", verifyToken, sentReplyComment)


// API Users
router.get("/users", findUser)
router.post("/user/register", Register)
router.post("/user/login", Login)
router.post("/user/logout", Logout)

// User Feature
router.get("/user/followers", getFollowers)
router.get("/user/followeds", getFolloweds)
router.post("/user/follow", unAndFollow)

// API Like Post
router.get("/likes", getLikesPost)
router.post("/likes", verifyToken, likePosts)
router.delete("/likes/:id", verifyToken, unlikePost)

// API Chats
router.post("/conversation", verifyToken, sendMessage)
router.get("/conversation/:id", verifyToken, getConversation)
router.get("/chat/:id", getLastConversation)
router.get("/conversations/:userId", getAllConversation)
router.get("/chats/:id", verifyToken, getDetailParticipan)

export default router