import { Sequelize } from "sequelize";
import db from "../config/Database.js";
import Users from "./UsersModel.js";


const { DataTypes } = Sequelize

const Posts = db.define('posts', {
    desc: {
        type: DataTypes.STRING,
        allowNull: false
    },
    img: {
        type: DataTypes.STRING
    }
})


Users.hasMany(Posts, { foreignKey: 'userId' })
Posts.belongsTo(Users, { foreignKey: 'userId', onDelete: 'CASCADE' })


export default Posts;