const passport = require("passport");
const User = require("../services/schemas/user");
const auth = (req, res, next) => {
  passport.authenticate("jwt", { session: false }, async (err, user) => {
    const u = await User.findById(user._id);
    const [, token] = req.headers.authorization.split(" ");
    const checkToken = token === u.token;

    if (!user || !u || !checkToken || err) {
      return res.status(401).json({
        status: "error",
        code: 401,
        message: "Unauthorized",
        data: "Unauthorized",
      });
    }
    req.user = u;
    next();
  })(req, res, next);
};

module.exports = auth;
