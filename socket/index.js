// const io = require("socket.io")(8000, {
//     cors: {
//         origin: 'http://localhost:3000'
//     }
// })

// let users = []

// const addUser = (userId, socketId) => {
//     !users.some((user) => user.userId === userId) &&
//         users.push({ userId, socketId })
// }

// const removeUser = (socketId) => {
//     users = users.filter((user) => user.socketId !== socketId)
// }

// const getUser = (userId) => {
//     return users.find(user => user.userId === userId)
// }

// io.on("connection", (socket) => {
//     console.log("some user connected");
//     // take userId and socketId from user
//     socket.on("addUser", (userId) => {
//         addUser(userId, socket.id)
//         io.emit("getUsers", users)
//     })

//     // send message

//     socket.on('sendMessage', ({ senderId, reciverId, text }) => {
//         const user = getUser(reciverId)
//         io.to(user.socketId).emit('getMessage', {
//             senderId,
//             text,
//         })

//     })

//     socket.on("disconnect", () => {
//         console.log("some user disconnected!");
//         removeUser(socket.id)
//         io.emit("getUsers", users)
//     })
// })

const { Server } = require("socket.io")

const io = new Server({
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
        console.log({ user });
        if (user) {
            io.to(user.socketId).emit("getMessage", message)
        }

    })

    // const getUser = (userId) => {
    //     return onlineUsers.find(user => user.userId === userId)
    // }


    // socket.on('sendMessage', ({ senderId, reciverId, text }) => {
    //     const user = getUser(reciverId)
    //     console.log(user);
    //     if (user) {
    //         io.to(user.socketId).emit('getMessage', {
    //             senderId,
    //             text,
    //         })
    //     }
    // })

    socket.on("disconnect", () => {
        onlineUsers = onlineUsers.filter(user => user.socketId !== socket.id)
        io.emit("getOnlineUsers", onlineUsers)

    })
})

io.listen(8000)