import { Sequelize } from "sequelize";
import db from "../config/Database.js";
import Users from "./UsersModel.js";
import Posts from "./PostsModel.js";
import Comments from "./CommentsModel.js";
// import Comments from "./CommentsModel.js";
// import Posts from "./PostsModel.js";
// import Users from "./UsersModel.js";

const { DataTypes } = Sequelize

const ReplyComments = db.define("replyComments", {
    replyBody: {
        type: DataTypes.STRING,
        allowNull: false
    }
})


ReplyComments.belongsTo(Users, { foreignKey: 'userId', onDelete: 'CASCADE' })
Users.hasMany(ReplyComments, { foreignKey: 'userId' })
ReplyComments.belongsTo(Posts, { foreignKey: 'postId', onDelete: 'CASCADE' })
Posts.hasMany(ReplyComments, { foreignKey: 'postId' })
ReplyComments.belongsTo(Comments, { foreignKey: 'commentId', onDelete: 'CASCADE' })
Comments.hasMany(ReplyComments, { foreignKey: 'commentId' })


export default ReplyComments