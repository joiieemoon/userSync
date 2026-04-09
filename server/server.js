
import express from "express";
import http from "http";
import cors from "cors";

import { initSocket } from "./socket/socket-instance/index.js";
import { registerSocketHandlers } from "./socket/handler/index.js";

const app = express();
app.use(cors());

const server = http.createServer(app);

const io = initSocket(server);


registerSocketHandlers(io);

server.listen(5000, () => {
  console.log("Server running on port 5000");
});
app.get("/", (req, res) => {
  res.send("Server is running ");
});

