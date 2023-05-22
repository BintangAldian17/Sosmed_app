import express from "express"
import db from "./config/Database.js";
import router from "./routes/index.js";
import cors from "cors"
import cookieParser from "cookie-parser";
import { Server } from "socket.io"
import Conversation from "./models/Conversation.js"
import Chat from "./models/ChatModel.js";

const app = express()

try {
    await db.authenticate()
    console.log("Database Connected");
} catch (error) {
    console.error(error);
}

app.use(cors({
    credentials: true,
    origin: ['http://127.0.0.1:3000', 'http://localhost:3000']
}))
app.use(cookieParser())
app.use(express.json())
app.use(router)

const server = app.listen(5000, () => {
    console.log("Server running on port 5000");
})

// Socket config

const io = new Server(server, {
    cors: 'http://localhost:3000'
})

let onlineUsers = []

io.on("connection", (socket) => {
    console.log("new connection", socket.id);

    // listen to a connection
    socket.on("addNewUser", (userId) => {
        !onlineUsers.some(user => user.userId === userId) &&
            onlineUsers.push({
                userId,
                socketId: socket.id
            })
        console.log("onlineUser", onlineUsers);

        io.emit("getOnlineUsers", onlineUsers)
    })

    // add message
    socket.on("sendMessage", (message) => {
        console.log(message);
        const user = onlineUsers.find(user => user.userId === message.reciverId)
        if (user) {
            io.to(user.socketId).emit("getMessage", message)
        }

    })

    socket.on("disconnect", () => {
        onlineUsers = onlineUsers.filter(user => user.socketId !== socket.id)
        io.emit("getOnlineUsers", onlineUsers)

    })
})

// io.listen(5000)