import {
  getAllUsers,
  getUser,
  updateUser,
  deleteUser,
  getUserHabitModel,
  createUserModel,
} from "../models/userModel.js";
import bcrypt from "bcryptjs";
import initKnex from "knex";
import configuration from "../knexfile.js";
const knex = initKnex(configuration);

// get/api/users
const getAllUsersDetails = async (req, res) => {
  const users = await getAllUsers();

  if (!users) {
    res.status(500).json({ message: "Unable to retrieve users" });
    return;
  }
  delete users.password;
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
  delete user.password;
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

// export const createUser = async (req, res) => {
//   const { email, password, name } = req.body;

//   if (!email || !password || !name) {
//     return res
//       .status(400)
//       .send("Please enter all required fields: name, email, address");
//   }

//   const hashedPassword = bcrypt.hashSync(password);

//   const newUser = {
//     email,
//     password: hashedPassword,
//     name,
//   };

//   const [createdId] = await knex("user").insert(newUser);
//   res.status(201).json(createdId);
// };

// post/api/users
const createUser = async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    res
      .status(400)
      .json({ message: "Please provide information for all input fields" });
    return;
  }

  const hashedPassword = bcrypt.hashSync(password);

  const newUser = {
    username,
    password: hashedPassword,
  };

  const createdUser = await createUserModel(newUser);

  // const [createdId] = await knex("users").insert(newUser);
  //   res.status(201).json(createdId);

  if (!createdUser) {
    res.status(400).json({
      message: "Could not create user",
    });
    return;
  }

  res.status(201).json(createdUser.id);
};

//
export const loginUser = async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res
      .status(400)
      .send("Please enter all required fields: email, password");
  }

  // Find the user
  const user = await knex("users").where({ username: username }).first();
  if (!user) {
    return res.status(400).send("User does not exist");
  }

  // Check the password
  const isPasswordCorrect = bcrypt.compareSync(password, user.password);
  if (!isPasswordCorrect) {
    return res.status(400).send("Password is incorrect");
  }

  // Generate a token
  const jwtData = { userId: user.id };
  const token = jwt.sign(jwtData, process.env.JWT_SECRET, {
    expiresIn: "24h",
  });
  res.send(token);
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
  loginUser,
  updatedUser,
  removeUser,
  getUserHabits,
};
