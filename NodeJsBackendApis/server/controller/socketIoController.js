exports.io = (newIo) =>
  newIo.on("connection", (socket) => {
    console.log("socket io connection done");
    socket.on("send message", (data) => {
      newIo.emit("get chat message", data);
    });
  });