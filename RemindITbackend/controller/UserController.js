const UserModel = require("../models/Usermodel");
const jwt = require("jsonwebtoken");
/*********************users********************/

const getCurrentUser = async (req, res) => {
  try {
    // const userId = req.userId;
    const token=req.cookies.jwt
    if (!token) {
      return res.status(401).json({
        message: "Authentication required",
        status: "failure",
      });
    }

    // Verify and decode the JWT token
    const decoded = jwt.verify(token, process.env.SECRET_KEY);

    // Get userId from the decoded token
    const userId = decoded.id;

   const user = await UserModel.findById(userId);
    
    if (!user) {
      return res.status(404).json({
        message: "User not found",
        status: "failure",
      });
    }

    res.status(200).json({
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        createdAt: user.createdAt,
        wishlist: user.wishlist,
        isPremium: user.isPremium,
      },
      status: "success",
    });
  } catch (err) {
    res.status(500).json({
      message: err.message,
      status: "failure",
    });
  }
};
const getCurrentUserFromToken = async (token) => {
  if (!token) {
    throw new Error("Authentication token missing");
  }

  const decoded = jwt.verify(token, process.env.SECRET_KEY);
  const user = await UserModel.findById(decoded.id);
  
  if (!user) {
    throw new Error("User not found");
  }

  return user;
};

module.exports={getCurrentUser,getCurrentUserFromToken}