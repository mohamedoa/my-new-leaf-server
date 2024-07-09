import {
  getAllHabits,
  getHabit,
  createHabitModel,
  updateHabit,
  deleteHabit,
  getHabitProgressModel,
  updateHabitProgressModel,
} from "../models/habitModel.js";

// get/api/habits
const getAllHabitsDetails = async (req, res) => {
  const habits = await getAllHabits();

  if (!habits) {
    res.status(500).json({ message: "Unable to retrieve habits." });
    return;
  }

  res.json(habits);
};

// get/api/habits/:id (join or 2 queries)
const getHabitbyId = async (req, res) => {
  const habit = await getHabit(req.params.id);

  if (!habit) {
    res.status(404).json({
      message: `Habit with ID: ${req.params.id} is not found.`,
    });
    return;
  }

  res.json(habit);
};

const getHabitProgress = async (req, res) => {
  const habitProgress = await getHabitProgressModel(req.params.id);

  if (!habitProgress) {
    res.status(404).json({
      message: `Habit with ID: ${req.params.id} is not found.`,
    });
    return;
  }

  res.json(habitProgress);
};

const postHabitProgress = async (req, res) => {
  const body = req.body;

  if (!body.habit_id) {
    res.status(400).json({
      message: "Please fill in all required keys: habit_id.",
    });
    return;
  }

  const newHabitProgress = await updateHabitProgressModel(body);
  // TODO: newHabitProgress is the id of the new record, ideally we would give back the new record itself
  res.json(newHabitProgress);
};

// post/api/habits
const createHabit = async (req, res) => {
  const body = req.body;

  if (!body.user_id || !body.habit_name) {
    return res.status(400).json({
      message:
        "The body needs to be an object with the following keys. user_id and habit_name.",
    });
  }

  const newHabit = await createHabitModel(body);

  if (!newHabit) {
    return res.status(400).json({
      message: `Couldn't find a user with the id: ${body.user_id}`,
    });
  }

  res.status(201).json(newHabit);
};

// put/api/habits/:id
const updatedHabit = async (req, res) => {
  const newData = req.body;
  const id = req.params.id;
  const { user_id, habit_name } = newData;

  if (!user_id || !habit_name) {
    res.status(400).json({
      error: "Missing properties in request body",
      message:
        "The body needs to be an object with the following keys. user_id and habit_name.",
    });
    return;
  }

  const updatedHabit = await updateHabit(id, newData);

  if (updatedHabit === "User does not exist") {
    return res
      .status(400)
      .json({ message: `Could not find user with id ${user_id}` });
  } else if (!updatedHabit) {
    return res
      .status(404)
      .json({ message: `Could not find habit with id ${id}` });
  }

  res.status(200).json(updatedHabit);
};

// delete/api/habits/:id
const removeHabit = async (req, res) => {
  const delHabit = await deleteHabit(req.params.id);

  if (!delHabit) {
    res.status(404).json({
      message: `Habit with ID: ${req.params.id} is not found.`,
    });
    return;
  }

  res.status(204).end();
};

export default {
  getAllHabitsDetails,
  getHabitbyId,
  getHabitProgress,
  postHabitProgress,
  createHabit,
  updatedHabit,
  removeHabit,
};
