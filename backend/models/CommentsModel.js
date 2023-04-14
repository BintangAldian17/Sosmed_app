import { Sequelize } from "sequelize";
import db from "../config/Database.js";
import Posts from "./PostsModel.js";
import Users from "./UsersModel.js";


const { DataTypes } = Sequelize

const Comments = db.define('comments', {
    commentbody: {
        type: DataTypes.STRING,
        allowNull: false
    }
})


Users.hasMany(Comments, { foreignKey: 'userId' })
Posts.hasMany(Comments, { foreignKey: 'postId' })
Comments.belongsTo(Users, { foreignKey: 'userId', onDelete: 'CASCADE' })
Comments.belongsTo(Posts, { foreignKey: 'postId', onDelete: 'CASCADE' })


export default Comments;