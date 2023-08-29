const express = require("express");

const { registerUser, logUser, logOut, forgotPassword, resetPassword, userDetails, updateUserProfile, getAllUsers, getSpecificUserDetails, deleteUser, updateUserRole } = require("../controllers/userController.js");
const { isAuthenticated, isAdmin } = require("../middleware/checkAuth.js");


const router = express.Router();
router.route("/register").post(registerUser);
router.route("/login").post(logUser);
router.route("/logout").get(logOut);
router.route("/password/forgot").post(forgotPassword);
router.route("/password/reset/:token").put(resetPassword);
router.route("/user").get(isAuthenticated,userDetails);
router.route("/user/update").put(isAuthenticated,updateUserProfile);
router.route("/admin/users").get(isAuthenticated,isAdmin("admin"),getAllUsers);
router.route("/admin/user/:id").get(isAuthenticated,isAdmin("admin"),getSpecificUserDetails).delete(isAuthenticated,isAdmin("admin"),deleteUser).put(isAuthenticated,isAdmin("admin"),updateUserRole);

module.exports = router;