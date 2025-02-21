import express from "express";
import cors from "cors";
import "dotenv/config";
import { createServer } from "http";
import { Server } from "socket.io";
import connectDb from "./src/config/db.js";
import route from "./src/routers/document.route.js";

const PORT = process.env.PORT || 2025;

const app = express();

app.use(express.json());
app.use(cors());

const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST", "PUT"],
  },
});

// **Socket.io for Real-Time Collaboration**
io.on("connection", (socket) => {
  socket.on("change", data);

  socket.on("disconnect", () => {});
});

// let corsOptions = {
//   origin: 'http://localhost:3000/',
//   optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
// }

app.use("/api", route);

// socket.io create
// io.on("connection", (socket) => {
//   console.log(`User Connected: ${socket.id}`);

//   socket.on("joinDocument", async (docId) => {
//     socket.join(docId);
//     console.log(`User joined document: ${docId}`);

//     const document = await Document.findById(docId);
//     if (document) {
//       socket.emit("documentUpdated", document.content);
//     }
//   });

//   socket.on("editDocument", async ({ docId, content }) => {
//     await Document.findByIdAndUpdate(docId, { content });

//     // Broadcast update to all clients in the room
//     socket.to(docId).emit("documentUpdated", content);
//   });

//   socket.on("disconnect", () => {
//     console.log(`User Disconnected: ${socket.id}`);
//   });
// });

//

server.listen(PORT, () => {
  connectDb();
  console.log(`server is running on ${PORT}`);
});
