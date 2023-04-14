import { Sequelize } from "sequelize";
import db from "../config/Database.js";
import Users from "./UsersModel.js";
import Posts from "./PostsModel.js";



const Likes = db.define('likes')

Users.hasMany(Likes, { foreignKey: 'userId' })
Posts.hasMany(Likes, { foreignKey: 'postId' })
Likes.belongsTo(Users, { foreignKey: 'userId', onDelete: 'CASCADE' })
Likes.belongsTo(Posts, { foreignKey: 'postId', onDelete: 'CASCADE' })


export default Likes