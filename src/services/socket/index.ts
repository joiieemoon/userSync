
import { getIdToken } from "firebase/auth";
import { io } from "socket.io-client";
import { auth } from "../firebase/firebase";

export const socket = io("http://localhost:5000", {
    autoConnect: false,
});

// socket events
socket.on("connect", () => {
    console.log("Client connected:", socket.id);
});

socket.on("trymessage", (data) => {
    console.log("from data", data);
});

socket.on("disconnectdashboard", (soceket) => {
    console.log("disconnected", soceket);
});


export const chatsocket = io("http://localhost:5000/chat", {
    multiplex: false,
    forceNew: true,
    autoConnect: false,
    reconnection: true,
    reconnectionAttempts: 6,
    reconnectionDelay: 1000,
    reconnectionDelayMax: 5000,
});

// FIX 2: token function (runtime safe)
export const connectChatSocket = async () => {
    const user = auth.currentUser;

    if (!user) {
        console.log("No user logged in");
        return;
    }

    const tokenfire = await user.getIdToken();

    chatsocket.auth = {
        token: tokenfire,
    };

    chatsocket.connect();
};

