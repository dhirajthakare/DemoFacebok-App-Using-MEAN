var messengerModel = require("../model/messenger");
const messenger = require("../model/messenger");

//send message
exports.sendMsg = async (req, res) => {
  try {
    const send = await new messenger({
      message: req.body.message,
      sender_id: req.body.sender_id,
      receiver_id: req.body.receiver_id,
    });
    send.save();
    res.json("Successfully sended message");

  } catch (error) {
    res.status(400).json("Something wrong while send message");
  }
};

//get messages
exports.getUserMessage = (req, res) => {
  try {
    const chatMessages = await;
    messengerModel.find({
      $or: [
        { sender_id: req.params.fid, receiver_id: req.params.uid },
        { sender_id: req.params.uid, receiver_id: req.params.fid },
      ],
    });
    res.json(chatMessages);
  } catch (error) {
    res.status(400).json("Something wrong while get message");
  }
};
