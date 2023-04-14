import { Sequelize } from "sequelize";
import db from "../config/Database.js";
import Users from "./UsersModel.js";

const { DataTypes } = Sequelize

const Follows = db.define('follows', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    followerUserId: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    followedUserId: {
        type: DataTypes.INTEGER,
        allowNull: false,
    }
})


Users.belongsToMany(Users, { as: 'follower', through: Follows, foreignKey: 'followerUserId' })
Users.belongsToMany(Users, { as: 'followed', through: Follows, foreignKey: 'followedUserId' })


export default Follows

