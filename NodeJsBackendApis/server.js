const express = require("express");
const app = express();
const fs = require("fs");
const path = require("path");

const dotenv = require("dotenv");
dotenv.config({ path: ".env" });

const cors = require("cors");
app.use(cors());

const bodyParser = require("body-parser");
app.use(bodyParser.json());

const port = process.env.PORT || 2000;

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

// Directory listing route for /assets/postStorage/
app.get("/assets/postStorage/", (req, res) => {
  const directoryPath = path.join(__dirname, "assets/postStorage");

  fs.readdir(directoryPath, (err, files) => {
    if (err) {
      console.error("Error reading directory:", err);
      return res.status(500).send("Failed to list directory");
    }

    const fileLinks = files
      .map(file => `<li><a href="/assets/postStorage/${file}">${file}</a></li>`)
      .join("");

    const html = `
      <html>
        <head><title>Directory Listing</title></head>
        <body>
          <h1>Directory Listing for /assets/postStorage</h1>
          <ul>${fileLinks}</ul>
        </body>
      </html>
    `;

    res.send(html);
  });
});

httpServer.listen(port, () => {
  console.log(`server Running on http://localhost:${port}`);
});
