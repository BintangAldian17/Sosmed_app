import express from "express"
import db from "./config/Database.js";
import router from "./routes/index.js";
import cors from "cors"
import cookieParser from "cookie-parser";
import { fileURLToPath } from "url"
import { Server } from "socket.io"
import path from "path";



const app = express()
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
console.log(__dirname);

try {
    await db.authenticate()
    console.log("Database Connected");
} catch (error) {
    console.error(error);
}

const port = process.env.PORT || 5000

app.use(cors({
    credentials: true,
    origin: ['http://0.0.0.0:3000', 'https://sosmed-app-client.vercel.app', 'http://localhost:3000']
}))
app.use(cookieParser())
app.use(express.json())
app.use(express.static(path.join(__dirname + '../client/publict/upload')));
app.use(router)

const server = app.listen(port, () => {
    console.log(`Server running on port ${port}`);
})

// Socket config

const io = new Server(server, {
    cors: ['http://localhost:3000', 'https://sosmed-app-client.vercel.app']
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