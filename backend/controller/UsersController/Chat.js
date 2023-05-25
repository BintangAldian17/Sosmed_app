import Conversation from "../../models/Conversation.js";
import Chat from "../../models/ChatModel.js";
import { Op, Sequelize } from "sequelize";
import Users from "../../models/UsersModel.js";

export const sendMessage = async (req, res) => {
    const { reciverId, message } = req.body
    try {
        const checkConversation = await Conversation.findOne({
            where: {
                [Op.or]: [{
                    senderId: req.id,
                    reciverId: reciverId
                }, {
                    senderId: reciverId,
                    reciverId: req.id
                }]

            }
        })
        if (!checkConversation) {
            const conversation = await Conversation.create({
                senderId: req.id,
                reciverId: reciverId
            })
            await Chat.create({
                conversationId: conversation.id,
                senderId: req.id,
                message: message
            })
            return res.status(200).json('Conversation has been Created')
        } else {

            return res.status(400).json('Conversation Allready exsist')
        }
    } catch (error) {
        console.log(error);
        res.status(500).json(error)
    }
}

export const sendPersonalMessage = async (req, res) => {
    const { conversationId, message } = req.body
    try {
        await Chat.create({
            conversation: conversationId,
            senderId: req.id,
            message: message
        })
        res.status(200).json('message send success')
    } catch (error) {
        res.status(500).json(error)
    }
}

export const getConversation = async (req, res) => {
    const { id } = req.params
    try {
        const conversation = await Chat.findAll({
            where: {
                conversationId: id
            },
            include: [{
                model: Users,
                attributes: ['id', 'avatar', 'username']
            }],
            order: [['createdAt', 'ASC']]
        })

        return res.status(200).json(conversation)
    } catch (error) {
        console.log(error);
        res.status(500).json(error)
    }
}

export const getAllConversation = async (req, res) => {
    try {
        const conversation = await Users.findAll({
            where: {
                id: req.id
            },
            attributes: [],
            include: [{ model: Users, as: 'sender', through: Conversation, attributes: ['id', 'username', 'avatar'] }, { model: Users, as: 'reciver', through: Conversation, attributes: ['id', 'username', 'avatar'] }]
        })
        const allConversation = [].concat(...conversation.map(item => [...item.sender, ...item.reciver]))
        const getConversationId = allConversation.map(e => e.conversation.id)
        const lastConversation = await Chat.findAll({
            where: {
                conversationId: {
                    [Op.in]: getConversationId
                }
            },
            group: ['conversationId'],
            attributes: ['conversationId', [Sequelize.fn('max', Sequelize.col('createdAt')), 'createdAt'],
                [Sequelize.literal(`(
                SELECT message FROM chats AS c2
                WHERE c2.conversationId = conversationId
                AND c2.createdAt = (
                SELECT MAX(createdAt) FROM chats AS c3
                WHERE c3.conversationId = conversationId
                )
                )`),
                    'message'
                ]],

        })
        const results = allConversation.map(user => {
            const conversation = lastConversation.find(conv => conv.conversationId === user.conversation.id)
            return {
                id: user.id, username: user.username, avatar: user.avatar, conversation: conversation ? {
                    message: conversation.message, conversationId: conversation.conversationId, createdAt: conversation.createdAt
                } : null
            }
        })
        if (results !== null) {
            const sortResults = results.sort((a, b) => new Date(b.conversation.createdAt) - new Date(a.conversation.createdAt))
            return res.status(200).json(sortResults)
        }

    } catch (error) {
        console.log(error);
        return res.status(500).json(error)
    }
}

export const getLastConversation = async (req, res) => {
    const { id } = req.params
    try {
        const lastConversation = await Chat.findOne({
            where: {
                conversationId: id
            },
            order: [['createdAt', 'DESC']]
        })
        return res.status(200).json(lastConversation)
    } catch (error) {
        console.log(error);
        return res.status(500).json(error)
    }
}

export const getDetailParticipan = async (req, res) => {
    const { id } = req.params
    try {
        const getParticipan = await Conversation.findOne({
            where: {
                id: id
            },
            attributes: ['senderId', 'reciverId']
        })
        let participanId
        if (getParticipan.senderId === req.id) {
            participanId = getParticipan.reciverId
        } else if (getParticipan.reciverId === req.id) {
            participanId = getParticipan.senderId
        }
        console.log(participanId);
        const participan = await Users.findOne({
            where: {
                id: participanId
            }, attributes: ['id', 'username', 'avatar']

        })
        return res.status(200).json(participan)
    } catch (error) {
        console.log(error);
        return res.status(500).json(error)
    }
}
