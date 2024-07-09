import express from "express";
import communityController from "../controllers/communityController.js";

const router = express.Router();

router.get("/", communityController.getAllCommunityPostsDetails);
router.get("/:id", communityController.getCommunityPostbyId);
router.post("/", communityController.postCommunityPost);
router.put("/:id", communityController.updatedCommunityPost);
router.delete("/:id", communityController.removeCommunityPost);

export default router;
