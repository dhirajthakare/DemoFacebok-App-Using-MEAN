exports.io = (newIo) =>
  newIo.on("connection", (socket) => {
    // console.log("socket io connection done");
    socket.on("send message", (data) => {
      newIo.emit("get chat message", data);
    });
    
    socket.on("join-room", (ROOM_ID, userName, userId,friendDetails,videoChatUrl) => {
      // console.log(ROOM_ID, userName, userId,friendDetails);
      socket.join(ROOM_ID);
      setTimeout(() => {
        if(friendDetails){
          socket.broadcast.emit("call-friend",{friendDetails:friendDetails,chatURL:videoChatUrl});
        }
        socket.broadcast.to(ROOM_ID).emit("user-connected", userId);
      }, 1000);

      socket.on("sendmessage", (message) => {
        newIo
          .to(ROOM_ID)
          .emit("getmessage", { message: message, userName: userName });
      });

      socket.on("leave room", () => {
        // console.log("leave room", userName, userId, ROOM_ID);
        socket.broadcast.to(ROOM_ID).emit("leave room user", {
          userName: userName,
          userId: userId,
          message: " has left this room.",
        });
        socket.leave(ROOM_ID);
      });
    });
  });
