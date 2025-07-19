import UserModel from "../models/userModel.js";

/* ----------- Changer User Roler To Owner ----------- */
const changeUserRoleToOwner = async (req, res) => {
  try {
    const { id: userId } = req.user;

    // FindUser
    const user = await UserModel.findById(userId);
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User Not Found" });
    }

    // Changer User role to owner
    await UserModel.findByIdAndUpdate(
      userId,
      {
        $set: {
          role: "owner",
        },
      },
      { new: true }
    );

    return res
      .status(200)
      .json({ success: true, message: "Now You Can List cars" });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

export { changeUserRoleToOwner };
