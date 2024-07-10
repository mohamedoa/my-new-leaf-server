import {
  getAllCommunityPosts,
  getCommunityPost,
  createCommunityPost,
  updateCommunityPost,
  deleteCommunityPost,
} from "../models/communityPostModel.js";

// get/api/communityPosts
const getAllCommunityPostsDetails = async (req, res) => {
  const communityPosts = await getAllCommunityPosts();

  if (!communityPosts) {
    res.status(500).json({ message: "Unable to retrieve communityPosts." });
    return;
  }

  res.json(communityPosts);
};

// get/api/communityPosts/:id (join or 2 queries)
const getCommunityPostbyId = async (req, res) => {
  const communityPost = await getCommunityPost(req.params.id);

  if (!communityPost) {
    res.status(404).json({
      message: `CommunityPost with ID: ${req.params.id} is not found.`,
    });
    return;
  }

  res.json(communityPost);
};

// post/api/communityPosts
const postCommunityPost = async (req, res) => {
  const body = req.body;

  if (!body.user_id || !body.post_description) {
    return res.status(400).json({
      message:
        "The body needs to be an object with the following keys. user_id and communityPost_name.",
    });
  }

  const newCommunityPost = await createCommunityPost(body);

  if (!newCommunityPost) {
    return res.status(400).json({
      message: `Couldn't find a user with the id: ${body.user_id}`,
    });
  }

  res.status(201).json(newCommunityPost);
};

// put/api/communityPosts/:id
const updatedCommunityPost = async (req, res) => {
  const body = req.body;
  const postId = req.params.id;
  const { id, post_description, post_likes } = body;

  if (!user_id) {
    res.status(400).json({
      error: "Missing properties in request body",
      message:
        "The body needs to be an object with the following keys: user_id",
    });
    return;
  }

  const updatedCommunityPost = await updateCommunityPost(id, newData);

  if (updatedCommunityPost === "User does not exist") {
    return res
      .status(400)
      .json({ message: `Could not find user with id ${user_id}` });
  } else if (!updatedCommunityPost) {
    return res
      .status(404)
      .json({ message: `Could not find communityPost with id ${id}` });
  }

  res.status(200).json(updatedCommunityPost);
};

// delete/api/communityPosts/:id
const removeCommunityPost = async (req, res) => {
  const delCommunityPost = await deleteCommunityPost(req.params.id);

  if (!delCommunityPost) {
    res.status(404).json({
      message: `CommunityPost with ID: ${req.params.id} is not found.`,
    });
    return;
  }

  res.status(204).end();
};

export default {
  getAllCommunityPostsDetails,
  getCommunityPostbyId,
  postCommunityPost,
  updatedCommunityPost,
  removeCommunityPost,
};
