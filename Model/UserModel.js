import mongoose from "mongoose";
const { Schema } = mongoose;

const userSchema = new Schema({
  username: {
    type: String,
    required: [true, "Username is required"],
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: true,
    match: [/\S+@\S+\.\S+/, "Please enter a valid email address"],
  },
  password: {
    type: String,
    required: [true, "Password is required"],
  },
  role: {
    type: String,
    enum: ["student", "admin"],
    default: "user",
  },
});

const User = mongoose.model("User", userSchema);

export default User;
