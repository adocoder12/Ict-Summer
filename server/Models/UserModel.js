const { model, Schema } = require("mongoose");
// const validator = require("validator");
const bcrypt = require("bcrypt");

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
    min: 3,
    max: 20,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    max: 50,
  },
  password: {
    type: String,
    required: true,
    min: 8,
  },
});

// if want to change the password should make sure that don't hash the password that hasnt been changed,
// do only hashing if the password has changed

userSchema.pre("save", async function (next) {
  const user = this;
  // only hash the password if it has been modified (or is new)
  if (!user.isModified("password")) return next();
  // Encrypts the user
  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(user.password, salt);
  user.password = hash;
  next();
});

userSchema.methods.comparePassword = async function (candidatePassword) {
  console.log("Compare pass");
  const user = this;
  //const isMatch = await bcrypt.compare(candidatePassword, username.password);

  const isMatch = await bcrypt.compare(candidatePassword, user.password);

  return isMatch;
};

/*
// userSchema.statics.signUp = async function (username, email, password) {
//   if (!username || !email || !password) {
//     throw Error(" All fields must be filled ");
//   }

//   if (password < 4) {
//     throw Error(" Password is too short ");
//   }

//   if (!validator.isEmail(email)) throw error(" Email is not valid ");

//   const emailExists = await this.findOne({ email });
//   const usernameExists = await this.findOne({ username });

//   if (emailExists) {
//     throw Error(" Email in use ");
//   }
//   if (usernameExists) {
//     throw Error(" Username already exists ");
//   }

//   // Encrypts the user
//   const salt = await bcrypt.genSalt(10);
//   const hash = await bcrypt.hash(password, salt);

//   const user = await this.create({
//     email,
//     username,
//     password: hash,
//   });

//   return user;
// };

// userSchema.statics.login = async function (name, password) {
//   if (!name || !password) throw Error(" All fields must be filled ");

//   const username = await this.findOne({ username: name });
//   if (name != username) throw Error(" Username is incorrect ");

//   if (password != bcrypt.compare(password, username.password))
//     throw Error(" Password is incorrect ");

//   return username;
// };

// // Need to test if this code works properly
// userSchema.statics.deleteUser = async function (name, password, reqId) {
//   if (!name || !password) throw error(" All fields must be filled ");

//   const user = await this.findOne({ username: name });
//   console.log("user " + user);

//   if (user.id.toString() != reqId.toString())
//     throw Error(" You can't delete this user. ");

//   if (!user) throw Error(" Username incorrect ");

//   if (password == (await bcrypt.compare(password, user.password)))
//     throw Error(" Passwor incorrect");

//   user.delete();
//   return user;
// };

// const PublicUser = model("User", userSchema);
// module.exports = PublicUser;
*/
module.exports = model("User", userSchema);
