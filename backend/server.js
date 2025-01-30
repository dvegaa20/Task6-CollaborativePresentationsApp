const mongoose = require("mongoose");
const Document = require("./Document");
const cors = require("cors");
const express = require("express");
const { Server } = require("socket.io");
const http = require("http");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGODB_URI, {});

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: process.env.VERCEL_URL,
    methods: ["GET", "POST"],
  },
});

const defaultValue = "";

io.on("connection", (socket) => {
  socket.on("get-document", async (documentId) => {
    const document = await findOrCreateDocument(documentId);
    socket.join(documentId);
    socket.emit("load-document", document.data);

    socket.on("send-changes", (delta) => {
      socket.broadcast.to(documentId).emit("receive-changes", delta);
    });

    socket.on("save-document", async (data) => {
      await Document.findByIdAndUpdate(documentId, {
        data,
        lastModified: new Date().toISOString(),
      });
    });
  });
});

async function findOrCreateDocument(id) {
  if (!id) return null;
  try {
    const document = await Document.findById(id);
    if (document) return document;
    return await Document.create({ _id: id, data: defaultValue });
  } catch (error) {
    console.error("Error finding/creating document:", error);
    return null;
  }
}

app.get("/documents", async (req, res) => {
  try {
    const documents = await Document.find({}, "-data");
    res.json(documents);
  } catch (error) {
    res.status(500).json({ error: "Error fetching documents" });
  }
});

app.post("/documents", async (req, res) => {
  const { title, type } = req.body;
  const id = new mongoose.Types.ObjectId().toString();

  const newDocument = new Document({
    _id: id,
    title: title || "Untitled Document",
    type: type || "slide",
    thumbnail: "",
    lastModified: new Date().toISOString(),
    data: {},
  });

  try {
    await newDocument.save();
    res.status(201).json(newDocument);
  } catch (error) {
    res.status(500).json({ error: "Error creating document" });
  }
});

server.listen(3001, () => console.log("Server running on port 3001"));
