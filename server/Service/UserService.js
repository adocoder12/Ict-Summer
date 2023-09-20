//user model
const User = require("../Models/UserModel");

const validator = require("validator");
const bcrypt = require("bcrypt");

//destructure the req.body object

const signUp = async function ({ username, email, password }) {
  console.log(`REGISTER service`);

  if (!username || !email || !password) {
    throw Error(" All fields must be filled ");
  }

  if (password < 4) {
    throw Error(" Password is too short ");
  }

  if (!validator.isEmail(email)) throw error(" Email is not valid ");

  const emailExists = await User.findOne({ email });
  const usernameExists = await User.findOne({ username });

  if (emailExists) {
    throw Error(" Email in use ");
  }
  if (usernameExists) {
    throw Error(" Username already exists ");
  }
  const user = await User.create({
    username,
    email,
    password,
  });
  user.save();

  return user;
};

const signIn = async function (username, password) {
  console.log("service signin");
  if (!username || !password)
    throw Error(" All fields must be filled to login");

  const user = await User.findOne({ username });

  const validatepassword = await user.comparePassword(password);

  if (!validatepassword && username !== user.name) {
    throw Error(" Password or Username is incorrect ");
  }
  return user;
};

// Need to test if this code works properly
const deleteUser = async function (name, password, reqId) {
  console.log("service deleteUser");

  if (!name || !password) throw error(" All fields must be filled ");

  const user = await User.findOne({ username: name });
  console.log("user " + user);

  if (user.id.toString() != reqId.toString())
    throw Error(" You can't delete this user. ");

  if (!user) throw Error(" Username incorrect ");

  if (password == (await bcrypt.compare(password, user.password)))
    throw Error(" Passwor incorrect");

  user.delete();
  return user;
};
const logOutService = async (id) => {
  console.log("logout Service");

  const user = await User.findById(_id);
  await user.save();

  return user;
};

const displayAllUsers = async () => {
  console.log("displayAllUsers Service");

  const users = await User.find();
  const userInfo = users.map((user) => {
    return {
      id: user._id,
      username: user.username,
      email: user.email,
      status: user.status,
    };
  });

  return userInfo;
};

module.exports = { signUp, signIn, deleteUser, logOutService, displayAllUsers };
