import userModel from "../models/userModel.js";

export const getUserData = async (req, res) => {
  try {
    const { id } = req.user;

    console.log("User Id:", id);

    const user = await userModel.findById(id);

    if (!user) {
      return res.json({ success: false, message: "User Not Found" });
    }

    res.json({
      success: true,
      userData: {
        firstName: user.FirstName,
        lastName: user.LastName,
        email: user.email,
      },
    });
  } catch (error) {
    return res.json({ success: false, message: error.message });
  }
};
