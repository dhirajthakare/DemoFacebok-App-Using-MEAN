const friedMappingModel = require("../model/user_friend_mapping");

exports.getFriendsId = async (userId) => {
  const userMap = await friedMappingModel.find({
    user_id: userId,
    friendStatus: "Accepted",
  });
  return userMap.map((m) => m.friend_id);
};
