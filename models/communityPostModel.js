import initKnex from "knex";
import configuration from "../knexfile.js";
const knex = initKnex(configuration);

export async function getAllCommunityPosts() {
  try {
    const data = await knex.select("*").from("posts");
    return data;
  } catch (error) {
    console.error(error);
    return false;
  }
}

// This should be getCommunityPosts by user_id
// Another function to getSinglePost by user_id and then post.id
export async function getCommunityPost(id) {
  try {
    const data = await knex
      .select("*")
      .from("posts")
      .where("posts.user_id", id);
    return data;
  } catch (error) {
    console.error(error);
    return false;
  }
}

export async function createCommunityPost(body) {
  try {
    const reponse = await knex("posts").insert(body);
    const newPostId = reponse[0];
    const createdPost = await knex("posts").where({ id: newPostId }).first();
    return createdPost;
  } catch (error) {
    console.log(error);
  }
}

export async function updateCommunityPost(id, body) {
  const userId = newData.user_id;
  const userExists = await knex("users").where({ id: userId }).first();
  if (!userExists) {
    return "User does not exist";
  }
  if (newData.user_id)
    try {
      const response = await knex("posts").where({ id }).update(newData);
      const updatedPost = await knex
        .select("posts.id", "user_id", "id")
        .from("posts")
        .where({ id });
      return updatedPost;
    } catch (error) {
      console.error(error);
      return false;
    }
}

export async function deleteCommunityPost(id) {
  try {
    const data = await knex("posts").where("posts.id", id).del();
    return data;
  } catch (error) {
    console.error(error);
    return false;
  }
}
