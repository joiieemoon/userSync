///server file 
import { Server } from "socket.io";

let io;

export const initSocket = (server) => {
    io = new Server(server, {
        cors: {
            origin: "*"
        }
    });


    io.of("/chat").on("connection", (socket) => {

        socket.on("chat-connected", (socket) => {
            console.log("chat socket is connected", socket);
        })
        socket.on("leave-chat", (socket) => {
            console.log("Leave chat");
        })
        socket.on("chat-message", (msg) => {
            console.log("Chat msg:", msg);

            io.of("/chat").emit("chat-message", msg);
        });
    });
    io.on("connection", (socket) => {
        console.log("User Connected", socket.id);
    })


    return io;
};