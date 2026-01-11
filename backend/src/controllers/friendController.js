export const addFriend = (req, res) => {
  try {
    
  } catch (error) {
    console.error("Lỗi <Kết bạn>", error);
    return res.status(500).json({message: "Lỗi hệ thống"});
  }
}; 

export const getAllFriends = (req, res) => {
  try {
    
  } catch (error) {
    console.error("Lỗi <Lấy danh sách bạn bè>", error);
    return res.status(500).json({message: "Lỗi hệ thống"});
  }
}; 

export const getFriendRequests = (req, res) => {
  try {
    
  } catch (error) {
    console.error("Lỗi <Lấy các lời mời kết bạn>", error);
    return res.status(500).json({message: "Lỗi hệ thống"});
  }
}; 

export const acceptFriendRequest = (req, res) => {
  try {
    
  } catch (error) {
    console.error("Lỗi <Chấp nhận lời mời kết bạn>", error);
    return res.status(500).json({message: "Lỗi hệ thống"});
  }
}; 

export const declineFriendRequest = (req, res) => {
  try {
    
  } catch (error) {
    console.error("Lỗi <Từ chối lời mời kết bạn>", error);
    return res.status(500).json({message: "Lỗi hệ thống"});
  }
}; 

