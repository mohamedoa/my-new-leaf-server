/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function seed(knex) {
  // Deletes ALL existing entries
  await knex("habits").del();
  await knex("habits").insert([
    {
      id: 1,
      user_id: 1,
      habit_name: "cycling",
    },
    {
      id: 2,
      user_id: 1,
      habit_name: "running",
    },
    {
      id: 3,
      user_id: 1,
      habit_name: "reading",
    },
    {
      id: 4,
      user_id: 1,
      habit_name: "meditation",
    },
  ]);
}
