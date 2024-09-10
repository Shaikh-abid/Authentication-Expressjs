import express from "express";
import {
  deleteUserByID,
  getAllUsers,
  getUserByID,
  signin,
  signup,
  updateUserProfile,
} from "../Controller/userController.js";
import { authenticateAdmin, authenticateUser } from "../Middlewares/auth.js";

const router = express.Router();

router.post("/signup", signup);
router.post("/signin", signin);
router.put("/update", authenticateUser, updateUserProfile);
router.get("/users", authenticateAdmin, getAllUsers);
router.get("/users/:id", authenticateAdmin, getUserByID);
router.delete("/users/:id", authenticateAdmin, deleteUserByID);

export default router;
