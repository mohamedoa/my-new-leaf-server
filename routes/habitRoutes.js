import express from "express";
import habitController from "../controllers/habitController.js";

const router = express.Router();

router.get("/", habitController.getAllHabitsDetails);
router.get("/:id", habitController.getHabitbyId);
router.get("/:id/progress", habitController.getHabitProgress);
router.post("/:id/progress", habitController.postHabitProgress);
router.post("/", habitController.createHabit);
router.put("/:id", habitController.updatedHabit);
router.delete("/:id", habitController.removeHabit);

export default router;
