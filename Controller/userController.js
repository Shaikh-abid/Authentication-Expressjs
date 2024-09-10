import User from "../Model/UserModel.js";
import bcrypt from "bcryptjs";

export const signup = async (req, res) => {
  try {
    const { username, email, password, role } = req.body;

    // Check if the user already exists
    const alreadyUser = await User.findOne({ email });

    if (alreadyUser) {
      return res.json({
        success: false,
        message: "User already registered with this email",
      });
    }

    try {
      // Hash the password
      const hashedPassword = await bcrypt.hash(password, 10);

      // Create a new user instance
      const newUser = new User({
        username,
        email,
        password: hashedPassword,
        role,
      });

      // Save the new user to the database
      await newUser.save();

      // Remove the password field from the response for security
      newUser.password = undefined;

      // Send the response
      res.json({
        success: true,
        message: "User signed in successfully!!",
        newUser,
      });
    } catch (error) {
      res.json({
        success: false,
        message: "User not signed in!!",
        error: error.message,
      });
    }
  } catch (error) {
    res.json({
      success: false,
      message: "Something went wrong, please fill all details",
      error: error.message,
    });
  }
};

export const signin = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({
        success: false,
        message:
          "Please first register user with this email-id and then try to login!!",
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    req.user = user;

    res.status(200).json({
      message: "Signed in successfully",
      user: { id: user._id, role: user.role },
    });
  } catch (error) {
    res.status(500).json({ message: "Error signing in", error: error });
  }
};

export const updateUserProfile = async (req, res) => {
  const { username, email, password } = req.body;

  try {
    const user = await User.findById(req.user._id);
    if (!user) return res.status(404).json({ message: "User not found" });

    user.username = username || user.username;
    user.email = email || user.email;
    if (password) {
      user.password = await bcrypt.hash(password, 10);
    }

    await user.save();
    res.status(200).json({ message: "User profile updated successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error updating profile", error });
  }
};

export const getAllUsers = async (req, res) => {
  try {
    const allUsers = await User.find({ role: "student" });

    console.log(allUsers);

    if (!allUsers) {
      return res.status(401).json({
        success: false,
        message: "No users in data base!!",
      });
    }

    res.status(200).json({
      success: true,
      message: "Users fetched!!",
      allUsers,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Something went wrong...... server error",
      allUsers: [],
    });
  }
};

export const getUserByID = async (req, res) => {
  try {
    const { id } = req.params;
    console.log(id);

    const user = await User.findOne({ role: "student", _id: id });

    console.log(user);

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "No users in data base!!",
      });
    }

    res.status(200).json({
      success: true,
      message: "Users fetched!!",
      user,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Something went wrong...... server error",
      user: [],
    });
  }
};

export const deleteUserByID = async (req, res) => {
  try {
    const { id } = req.params;
    console.log(id);

    const user = await User.findOneAndDelete({ role: "student", _id: id });

    console.log(user);

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "No users in data base!!",
      });
    }

    res.status(200).json({
      success: true,
      message: "Users Deleted successfully!!",
      user,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Something went wrong...... server error",
      user: [],
    });
  }
};
