import initKnex from "knex";
import configuration from "../knexfile.js";
const knex = initKnex(configuration);

export async function getAllHabits() {
  try {
    const data = await knex
      .select("habits.id", "habit_name", "user_id")
      .from("habits")
      .join("users", "users.id", "habits.user_id");
    return data;
  } catch (error) {
    console.error(error);
    return false;
  }
}

export async function getHabit(id) {
  try {
    const data = await knex.select("*").from("habits").where("id", id).first();

    return data;
  } catch (error) {
    console.error(error);
    return false;
  }
}
export async function getHabitProgressModel(id) {
  try {
    const data = await knex
      .select("id", "habit_id")
      .from("progress")
      .where("habit_id", id);

    return data;
  } catch (error) {
    console.error(error);
    return false;
  }
}

export async function updateHabitProgressModel(body) {
  try {
    const data = await knex("progress").insert(body);

    return data;
  } catch (error) {
    console.error(error);
    return false;
  }
}

export async function createHabitModel(body) {
  try {
    const reponse = await knex("habits").insert(body);
    const newHabitID = reponse[0];
    const createdHabit = await knex("habits").where({ id: newHabitID }).first();
    return createdHabit;
  } catch (error) {
    console.log(error);
  }
}

export async function updateHabit(id, newData) {
  const userId = newData.user_id;
  const userExists = await knex("users").where({ id: userId }).first();

  if (!userExists) {
    return "User does not exist";
  }

  if (newData.user_id)
    try {
      const response = await knex("habits").where({ id }).update(newData);

      const updatedHabit = await knex
        .select("habits.id", "user_id", "habit_name")
        .from("habits")
        .where({ id })
        .first();

      return updatedHabit;
    } catch (error) {
      console.error(error);
      return false;
    }
}

export async function deleteHabit(id) {
  try {
    const data = await knex("habits").where("habits.id", id).del();
    return data;
  } catch (error) {
    console.error(error);
    return false;
  }
}
