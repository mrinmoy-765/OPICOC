import userModel from "../models/userModel.js";

//get user data(profile)
export const getUserData = async (req, res) => {
  try {
    const { id } = req.user;

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
        phone: user.phone,
        address: user.address,
        city: user.city,
        country: user.country,
        zipCode: user.zipCode,
      },
    });
  } catch (error) {
    return res.json({ success: false, message: error.message });
  }
};

//update user profile
export const updateProfile = async (req, res) => {
  try {
    const { id } = req.user;

    const { FirstName, LastName, phone, address, country, city, zipCode } =
      req.body;

    if (FirstName === "" || LastName === "") {
      return res.json({
        success: false,
        message: "FirstName/LastName Can not be Empty",
      });
    }

    const user = await userModel.findByIdAndUpdate(
      id,
      {
        FirstName,
        LastName,
        phone,
        address,
        country,
        city,
        zipCode,
      },
      { new: true }
    );

    res.json({
      success: true,
      message: "Profile updated successfully",
      user,
    });
  } catch (error) {
    return res.json({ success: false, message: error.message });
  }
};
