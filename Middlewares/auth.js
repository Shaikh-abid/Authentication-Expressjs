import User from "../Model/UserModel.js";
import bcrypt from "bcryptjs";


export const authenticateUser = async (req, res, next) => {
  try {
    const { email } = req.body; // Assume email is passed in the body of the request

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized access. Please sign in first.",
      });
    }

    // Attach the user to the request object for further use
    req.user = user;

    next();
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error in authentication", error: error.message });
  }
};

export const authenticateAdmin = async (req, res, next) => {
  const { email, password } = req.body; // Expecting email and password in the request body..

  try {
    // Check if user exists with the provided email..
    const user = await User.findOne({ email });

    // If user is not found, return unauthorized..
    if (!user) {
      return res.status(401).json({
        success: false,
        message:
          "Unauthorized access. User not found. Please check credentials.",
      });
    }

    // Check if the user is an admin..
    if (user.role !== "admin") {
      return res.status(403).json({
        success: false,
        message: "Forbidden. You do not have admin privileges.",
      });
    }

    // Check if the password matches..
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized. Invalid password.",
      });
    }

    // Attach the user to the request object for future use..
    req.user = user;

    // Proceed to the next middleware or route handler..
    next();
  } catch (error) {
    // Catch any other errors..
    res.status(500).json({
      success: false,
      message: "Server error during authentication.",
      error: error.message,
    });
  }
};
