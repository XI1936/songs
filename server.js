const express = require("express");
const dotEnv = require("dotenv");
const connectDb = require("./config/connectdb");
const app = express();
const server = require("http").createServer(app);

const PORT = process.env.PORT || 5000;
dotEnv.config({ path: "./config/config.env" });

app.use(express.json());

app.get("/songs", async (req, res) => {
  const clientConnection = await connectDb();
  clientConnection.connect();
  const db = await clientConnection.db("songsDb");
  const songs = await db.collection("AllSongs").find({}).toArray();

  res.status(200).json({
    success: true,
    message: songs,
  });
});

app.post("/songs", async (req, res) => {
  const songData = req.body
  const clientConnection = await connectDb();
  clientConnection.connect();
  const db = await clientConnection.db("songsDb");
  const songs = await db
    .collection("AllSongs")
    .insertMany(songData);
  res.status(200).json({
    success: true,
    message: songs,
  });
});
server.listen(PORT, () => {
  console.log("server started at:", PORT);
});
