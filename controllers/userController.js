import {
  getAllUsers,
  getUser,
  updateUser,
  deleteUser,
  getUserHabitModel,
  createUserModel,
} from "../models/userModel.js";

// get/api/users
const getAllUsersDetails = async (req, res) => {
  const users = await getAllUsers();

  if (!users) {
    res.status(500).json({ message: "Unable to retrieve users" });
    return;
  }

  res.json(users);
};

// get/api/users/:id (join or 2 queries)
const getUserbyId = async (req, res) => {
  const user = await getUser(req.params.id);

  if (!user) {
    res.status(404).json({
      message: `User with ID: ${req.params.id} is not found.`,
    });
    return;
  }

  res.json(user);
};

// GET /api/users/:id/habits
const getUserHabits = async (req, res) => {
  const user = await getUserHabitModel(req.params.id);

  if (!user) {
    res.status(500).json({ message: `Internal server error` });
    return;
  }
  if (user.length === 0) {
    res.status(404).json({
      message: `Couldn't find any user with id: ${req.params.id}`,
    });
    return;
  }

  res.json(user);
};

// post/api/users
const createUser = async (req, res) => {
  if (!req.body.user_name) {
    res
      .status(400)
      .json({ message: "Please provide information for all input fields" });
    return;
  }

  const newUser = await createUserModel(req.body);

  if (!newUser) {
    res.status(400).json({
      message: "Could not create user",
    });
    return;
  }

  res.json(newUser);
};

// put/api/users/:id
const updatedUser = async (req, res) => {
  if (!req.body.user_name) {
    res
      .status(400)
      .json({ message: "Please provide information for all input fields" });
    return;
  }

  const updatedUser = await updateUser(req.params.id, req.body);

  if (!updatedUser) {
    res.status(400).json({
      message: "Could not update user",
    });
    return;
  }

  res.json(updatedUser);
};

// delete/api/users/:id
const removeUser = async (req, res) => {
  const delUser = await deleteUser(req.params.id);

  if (!delUser) {
    res.status(404).json({
      message: `User with ID: ${req.params.id} is not found.`,
    });
    return;
  }

  res.status(204).end();
};

export default {
  getAllUsersDetails,
  getUserbyId,
  createUser,
  updatedUser,
  removeUser,
  getUserHabits,
};
