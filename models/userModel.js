import initKnex from "knex";
import configuration from "../knexfile.js";
const knex = initKnex(configuration);

export async function getAllUsers() {
  try {
    const data = await knex
      .select("users.id", "username", "rank")
      .from("users");
    return data;
  } catch (error) {
    console.error(error);
    return false;
  }
}

export async function createUserModel(newUser) {
  try {
    const result = await knex("users").insert(newUser);

    const newUserId = result[0];
    const createdUser = await knex("users").where({ id: newUserId }).first();
    return createdUser;
  } catch (error) {
    return false;
  }
}

export async function getUser(id) {
  try {
    const data = await knex
      .select("id", "username", "rank")
      .from("users")
      .where("id", id)
      .first();
    return data;
  } catch (error) {
    console.error(error);
    return false;
  }
}

export async function getUserHabitModel(id) {
  try {
    const data = await knex
      .select("user_id", "habit_name")
      .from("habits")
      .where("user_id", id);
    return data;
  } catch (error) {
    console.error(error);
    return false;
  }
}

export async function updateUser(id, body) {
  try {
    const rowsUpdated = await knex("users").where({ id }).update(body);
    console.log(rowsUpdated);

    const updatedUser = await knex("users").where({ id });
    console.log(updatedUser);
    return updatedUser;
  } catch (error) {
    res.status(400).json({
      message: `Unable to update user with ID ${req.params.id}: ${error}`,
    });
  }
}

export async function deleteUser(id) {
  try {
    const data = await knex("users").where("users.id", id).del();
    return data;
  } catch (error) {
    console.error(error);
    return false;
  }
}
