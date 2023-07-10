const router = require("express").Router();
const AuthAPIs = require("../APIs/AuthAPI");

// user registration
router.route("/register").post((req, res) => {
  AuthAPIs.registerUser(req, res);
});

router.route("/login").post((req, res) => {
  AuthAPIs.login(req, res);
});

module.exports = router;
