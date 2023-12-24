exports.io = (newIo) => {
  newIo.on("connection", (socket) => {
    socket.on("send message", (data) => {
      newIo.emit("get chat message", data);
    });

    socket.on("join-room", (ROOM_ID, userName, userId, friendDetails, videoChatUrl) => {
      socket.join(ROOM_ID);
      setTimeout(() => {
        if (friendDetails) socket.broadcast.emit("call-friend", { friendDetails, chatURL: videoChatUrl });
        socket.broadcast.to(ROOM_ID).emit("user-connected", userId);
      }, 1000);

      socket.on("sendMessage", (message) => {
        newIo.to(ROOM_ID).emit("getMessage", { message, userName });
      });

      socket.on("leave room", () => {
        socket.broadcast.to(ROOM_ID).emit("leave room user", {
          userName,
          userId,
          message: " has left this room.",
        });
        socket.leave(ROOM_ID);
      });
    });
  });
};

