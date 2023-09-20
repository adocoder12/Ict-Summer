require("dotenv").config();
const jwt = require("jsonwebtoken");
const User = require("../Models/UserModel");

const authentication = async (req, res, next) => {
  console.log("auth midleware");
  const { authorization } = req.headers;
  console.log("authorization: " + authorization);

  let token;

  if (authorization && authorization.startsWith("Basic")) {
    try {
      token = authorization.split(" ")[1];
      console.log("token: " + token);

      const decoded = Buffer.from(token, "base64").toString("utf8");
      const [username] = decoded.split(":");
      console.log("credentials: " + username);

      // const decoded = jwt.verify(credentials, process.env.JWT_URI);

      const user = await User.findOne({ username });

      if (!user) {
        res.status(400).send({ error: "Insert username" });
        return;
      }

      req.username = user.username;
      req.password = user.password;

      next();
    } catch (error) {
      res.status(401).json({ error: "Request is not authorized" });
    }
  }

  if (!authorization) {
    return res.status(401).json({ error: "Authorization token required" });
  }
};

module.exports = authentication;
