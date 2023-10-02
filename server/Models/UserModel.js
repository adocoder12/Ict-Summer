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


module.exports = model("User", userSchema);
