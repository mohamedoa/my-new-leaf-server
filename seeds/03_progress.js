/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function seed(knex) {
  // Deletes ALL existing entries
  await knex("progress").del();
  await knex("progress").insert([
    {
      habit_id: 1,
    },
    {
      habit_id: 2,
    },
    {
      habit_id: 3,
    },
    {
      habit_id: 4,
    },
  ]);
}
