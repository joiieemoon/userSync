import { WebSocketServer } from "ws";
import admin from "../../firebase/index.js";
import { registerSocketHandlers } from "../handler/index.js";


let wss;

export const initSocket = (server) => {
    wss = new WebSocketServer({ server });

    wss.on("connection", async (ws, req) => {
        console.log("Client connected");

        try {

            const url = new URL(req.url, "http://localhost");
            const token = url.searchParams.get("token");

            if (!token) {
                console.log("No token found");
                ws.close();
                return;
            }


            const decodedToken = await admin.auth().verifyIdToken(token);


            ws.user = decodedToken;

            console.log("Authenticated user:", decodedToken.uid);

        } catch (err) {
            console.log("Auth failed:", err.message);
            ws.close();
            return;
        }

        registerSocketHandlers(ws, wss);
    });

    return wss;
};

export const getWSS = () => {
    if (!wss) throw new Error("WebSocket not initialized");
    return wss;
};
