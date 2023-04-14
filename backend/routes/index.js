import express from "express"
import { createPost, getAllPost, getDetailPost, deletePost } from "../controller/PostsController/Posts.js"
import { getCommentPost, postComment, deleteComment } from "../controller/PostsController/Comments.js"
import { getAllReplyComments, sentReplyComment } from "../controller/PostsController/ReplyComments.js"
import { Register, getAllUser, Login, Logout } from "../controller/UsersController/Users.js"
import { getFolloweds, getFollowers, unAndFollow } from "../controller/UsersController/UsersFeature.js"
const router = express.Router()

// API for Posts
router.get("/posts", getAllPost)
router.post("/posts", createPost)
router.get("/posts/:id", getDetailPost)
router.delete("/posts/:id", deletePost)

// API for comment on posts
router.get("/posts/:postId/comments", getCommentPost)
router.post("/posts/comments", postComment)
router.delete("/posts/comments/:commentId", deleteComment)

// API for reply comment on posts
router.get("/posts/:postId/comment/:commentId", getAllReplyComments)
router.post("/posts/:postId/comment/:commentId", sentReplyComment)


// API Users
router.get("/users", getAllUser)
router.post("/user/register", Register)
router.post("/user/login", Login)
router.post("/user/logout", Logout)

// User Feature
router.get("/user/followers", getFollowers)
router.get("/user/followeds", getFolloweds)
router.post("/user/follow", unAndFollow)
export default router