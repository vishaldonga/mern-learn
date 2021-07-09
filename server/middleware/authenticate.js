const jwt = require("jsonwebtoken");
const User = require("../model/userSchema");

const authenticate = async (req, res, next) => {
  try {
    const authToken = req.cookies.authtoken;
    const verifyToken = jwt.verify(authToken, process.env.SECRET_KEY);
    const user = await User.findOne({
      _id: verifyToken._id,
      "tokens.token": authToken,
    });
    if (!user) {
      throw new Error("User Not Found");
    }
    req.token = authToken;
    req.user = user;
    req.userId = user._id;
    next();
  } catch (err) {
    res.status(401).send("Unauthorized: No token");
  }
};

module.exports = authenticate;
