const express = require("express");
const app = express();

const dotenv = require("dotenv");
dotenv.config({ path: ".env" });

const cors = require("cors");
app.use(cors());

const bodyParser = require("body-parser");
app.use(bodyParser.json());

const port = process.env.PORT || 2000;;

app.use("/assets", express.static("assets"));

const connect = require("./server/database/db-config");

const mailConnect = require("./server/database/mail-connection");

const router = require("./server/routes/routes");
app.use(router);
const httpServer = require("http").Server(app);
const io = require("socket.io")(httpServer, {
  cors: {
    origins: ["http://localhost:4200"],
  },
});

const { ExpressPeerServer } = require("peer");
const options = {
  debug: true,
};

app.use("/peerjs", ExpressPeerServer(httpServer, options));

const socketIo = require("./server/controller/socket-Io.controller");
socketIo.io(io);

httpServer.listen(port, () => {
  console.log(`server Running on http://localhost:${port}`);
});
