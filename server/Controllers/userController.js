require("dotenv").config();
const jwt = require("jsonwebtoken");
const { log } = require("console");

const {
  signUp,
  signIn,
  deleteUser,
  logOutService,
  displayAllUsers,
} = require("../Service/UserService");

//GENERATE JWT

const generateJwt = (username, email, id) => {
  const userForToken = {
    username,
    email,
    id,
  };

  const token = jwt.sign(userForToken, process.env.JWT_URI, {
    expiresIn: 60 * 60 * 4,
  });
  return token;
};

//REGISTER
const register = async (req, res, next) => {
  console.log("controller register");
  try {
    // i passe the req.body that is an object and then i destructure on the user service file
    //one the problem was await missing before sign up we needed cuz the use user.find in the sign up function

    const validateUSer = await signUp(req.body);

    //destructer de values from the user object we got back from thw sign up function and adding then to the new user
    const { username, email, id } = validateUSer;

    const token = generateJwt(username, email, id);

    res.status(200).json({ token, message: "user succesfully register" });
  } catch (error) {
    console.log("catch register +  " + error);
    res.status(400).json({ error: error.message || "Register error" });
  }
};

//LOGIN
const login = async (req, res, next) => {
  console.log("controller login");
  const { username, password } = req.body;

  try {
    const user = await signIn(username, password);

    const token = generateJwt(user.username, user.email, user._id);
    console.log("token" + token);

    res.status(200).json({ token, message: `User logged in` });
    next();
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
//LOGOUT

const logOut = async (req, res) => {
  console.log("logout controller");
  try {
    const { _id } = req.body;
    const user = await logOutService(_id);
    if (user) {
      res.status(200).send("Logged out");
    }
  } catch (e) {
    console.log(e);
    res.status(400).json({ error: "could not be posible to logged out" });
  }
};

//ALL USERS
const getAllUsers = async (req, res) => {
  console.log("getAllUsers controller");

  try {
    const users = await displayAllUsers();

    res.status(200).send(users);
  } catch (error) {
    res.status(400).json({ error: error });
  }
};

module.exports = { login, register, logOut, getAllUsers };
