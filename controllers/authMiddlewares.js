exports.adminCheck = (req, res, next) => {
  if (req.user.role == "ADMIN") {
    return next();
  };
  return res.status(403).send("Insufficient rights.");
}