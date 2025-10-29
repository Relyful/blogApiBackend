const { Router } = require("express");
const postsController = require("../controllers/postsController");
const passport = require("passport");
const commentsRouter = require("./commentsRouter");
const { adminCheck } = require("../controllers/authMiddlewares");

const postsRouter = Router();

postsRouter.use("/:postId/comments", commentsRouter);

postsRouter.get("/", postsController.getPublishedPosts);
postsRouter.get(
  "/all",
  passport.authenticate("jwt", { session: false }),
  adminCheck,
  postsController.getPosts,
);
postsRouter.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  postsController.postPosts,
);
postsRouter.get("/:postId", postsController.getPost);
postsRouter.delete(
  "/:postId",
  passport.authenticate("jwt", { session: false }),
  adminCheck,
  postsController.deletePost,
);
postsRouter.put(
  "/:postId",
  passport.authenticate("jwt", { session: false }),
  postsController.updatePost,
);
postsRouter.put("/:postId/publish", postsController.publishPost);

module.exports = postsRouter;
