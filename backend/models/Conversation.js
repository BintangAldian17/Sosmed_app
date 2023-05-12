import db from "../config/Database.js";
import { Sequelize } from "sequelize";
import Users from "./UsersModel.js";

const { DataTypes } = Sequelize

const Conversation = db.define('conversation', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },

})

Users.belongsToMany(Users, { as: "sender", through: Conversation, foreignKey: 'senderId' })
Users.belongsToMany(Users, { as: "reciver", through: Conversation, foreignKey: "reciverId" })

export default Conversation;