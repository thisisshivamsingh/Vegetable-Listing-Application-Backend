const mongoose = require("mongoose");
const dotenv = require("dotenv");
const { createServer } = require("http");
const { Server } = require("socket.io");

dotenv.config({ path: "./config.env" });
const app = require("./app");

const server = createServer(app);

const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
  },
});

io.on("connection", (socket) => {
  console.log("a user connected");
  app.set("socket", socket);
  socket.on("disconnect", () => {
    console.log("user disconnected");
  });
});

const DB = process.env.DATABASE.replace(
  "<PASSWORD>",
  process.env.DATABASE_PASSWORD
);

mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("DB connnection successful!"));

const port = process.env.PORT || 3001;

server.listen(port, () => console.log(`App running on port ${port}...`));

module.exports = io;
