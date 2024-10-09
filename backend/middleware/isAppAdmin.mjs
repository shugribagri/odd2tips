import User from "../models/User.mjs";

const isAppAdmin = (req, res, next) => {
  if (!req.user || !req.user.userId) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  User.findById(req.user.userId)
    .then((user) => {
      if (!user || !user.isAdmin) {
        return res.status(401).json({ message: "Unauthorized" });
      }

      next();
    })
    .catch((error) => {
      console.error("Error authenticating user:", error);
      res.status(500).json({ message: "Failed to authenticate user" });
    });
};

export default isAppAdmin;
