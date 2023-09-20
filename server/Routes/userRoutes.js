const { Router } = require("express");
const {
  login,
  register,
  logOut,
  getAllUsers,
} = require("../Controllers/userController");

const authentication = require("../Midleware/authentication");

const router = Router();

//router routes
router.post("/register", register);
router.post("/login", authentication, login);
router.delete("/logout", logOut);
router.get("/auth", authentication);

router.get("/allusers", getAllUsers);
// router.use(authentication);

module.exports = router;
