import { Server } from "socket.io";

try {
    const io = new Server({
        cors: {
            origin: "http://localhost:5173",
        }
    });

    let onlineUser = [];
    console.log('Online users:', onlineUser);

    const addUser = (userId, socketId) => {
        const userExists = onlineUser.find(user => user.userId === userId);
        console.log(userExists);
        if (!userExists) {
            onlineUser.push({ userId, socketId });
        }
    };

    const removeUser = (socketId) => {
        onlineUser = onlineUser.filter(user => user.socketId !== socketId);
    };

    const getUser = (userId) => {
        return onlineUser.find((user) => user.userId === userId);
    };

    io.on("connection", (socket) => {
        socket.on('newUser', (userId) => {
            addUser(userId, socket.id);
            console.log('New user connected:', userId);
        });

        socket.on("sendMessage", ({ receiverId, data }) => {
            console.log('Receiver ID:', receiverId);
            const receiver = getUser(receiverId);
            console.log('Message data:', data);

            if (receiver) {
                io.to(receiver.socketId).emit("getMessage", data);
            } else {
                console.log('Receiver not found');
            }
        });

        socket.on("disconnect", () => {
            removeUser(socket.id);
            console.log('User disconnected:', socket.id);
        });
    });

    io.listen("4000");
    console.log('Socket server running on port 4000');
} catch (error) {
    console.error('Error starting socket server:', error);
}
