import express from "express";
import http from "http";
import cors from "cors";

import { initSocket } from "../server/socket/websocket-instance/index.js";

const app = express();
app.use(cors());

const server = http.createServer(app);


initSocket(server);

server.listen(5000, () => {
  console.log("Server running on port 5000 ");
});

app.get("/", (req, res) => {
  res.send("Server is running");
});