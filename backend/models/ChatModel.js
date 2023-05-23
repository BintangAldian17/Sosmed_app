import db from "../config/Database.js";
import { Sequelize } from "sequelize";
import Conversation from "./Conversation.js";
import Users from "./UsersModel.js";

const { DataTypes } = Sequelize

const Chat = db.define('chat', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    message: {
        type: DataTypes.TEXT('long'),
        allowNull: false,
    },
},)

Conversation.hasMany(Chat, { foreignKey: 'conversationId' })
Chat.belongsTo(Conversation, { foreignKey: 'conversationId', onDelete: 'CASCADE' })
Users.hasMany(Chat, { foreignKey: 'senderId' })
Chat.belongsTo(Users, { foreignKey: 'senderId', onDelete: 'CASCADE' })

export default Chat;