/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function seed(knex) {
  // Deletes ALL existing entries
  await knex("posts").del();
  await knex("posts").insert([
    {
      user_id: 1,
      post_description: "Keep going guys",
      post_likes: 10,
    },
    {
      user_id: 1,
      post_description: "You can do this",
      post_likes: 49,
    },
    {
      user_id: 1,
      post_description: "Dont give up",
      post_likes: 10000,
    },
    {
      user_id: 1,
      post_description: "If you can do one day you can do another",
      post_likes: 15,
    },
  ]);
}
