const { Router } = require("express");
const commentsController = require("../controllers/commentsController");
const passport = require("passport");
const { adminCheck } = require("../controllers/authMiddlewares");

const commentsRouter = Router({ mergeParams: true });

commentsRouter.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  commentsController.createComment,
);
commentsRouter.put(
  "/:commentId",
  passport.authenticate("jwt", { session: false }),
  commentsController.updateOwnComment,
);
commentsRouter.delete(
  "/:commentId",
  passport.authenticate("jwt", { session: false }),
  commentsController.removeOwnComment,
);
commentsRouter.delete(
  "/admin/:commentId",
  passport.authenticate("jwt", { session: false }),
  adminCheck,
  commentsController.removeCommentAdmin,
);

module.exports = commentsRouter;
