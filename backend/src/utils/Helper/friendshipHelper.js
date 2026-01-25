import { prisma } from '../../libs/prisma.js';

// kiểm tra 2 user có phải là bạn không
export const getAcceptedFriendship = async (userId_A, userId_B) => {
  if (userId_A === userId_B) return null;

  let userA = userId_A;
  let userB = userId_B;

  // Đảm bảo userA luôn nhỏ hơn userB
  if (userA > userB) {
    const temp = userA;
    userA = userB;
    userB = temp;
  }

  return prisma.friendship.findUnique({
    where: {
      userId_friendId: {
        userId: userA,
        friendId: userB
      }
    }
  });
}

export const isFriend = async (userA, userB) => {
  const friend = await getAcceptedFriendship(userA, userB);
  return !!friend && friend.status === "accepted";
}