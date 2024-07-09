import express from "express";
import userController from "../controllers/userController.js";

const router = express.Router();

router.get("/", userController.getAllUsersDetails);
router.get("/:id", userController.getUserbyId);
router.get("/:id/users", userController.getUserHabits);
router.post("/", userController.createUser);
router.put("/:id", userController.updatedUser);
router.delete("/:id", userController.removeUser);

export default router;
