import { getAcceptedFriendship } from "../utils/Helper/friendshipHelper.js";

export const checkFriendship = async (req, res, next) => {
  const userId = req.user.id;
  const { toUserId, type } = req.body;

  if (type !== "private") return next();

  const friendship = await getAcceptedFriendship(userId, toUserId);

  if (!friendship) {
    return res.status(403).json({ message: "Chưa là bạn bè" });
  }

  next();
};