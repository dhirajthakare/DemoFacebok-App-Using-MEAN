const express = require("express");
const app = express();

const dotenv = require("dotenv");
dotenv.config({ path: ".env" });

const cors = require("cors");
app.use(cors());

const bodyParser = require("body-parser");
app.use(bodyParser.json());

const port = 2000 || process.env.PORT;

app.use("/assets", express.static("assets"));

const connect = require("./server/database/dbconfig");

const mailConnect = require("./server/database/mailConnection");

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

const socketIo = require("./server/controller/socketIoController");
socketIo.io(io);

httpServer.listen(port, () => {
  console.log(`server Running on http://localhost:${port}`);
});
