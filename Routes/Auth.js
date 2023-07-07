const express = require("express");
const router = express.Router();
const AuthAPIs = require("../APIs/AuthAPI");

// user registration
router.route("/register").post((req, res) => {
  AuthAPIs.registerUser(req, res);
});

router.route("/login").post((req, res) => {
  AuthAPIs.login(req, res);
});

// router.route("/test").all((req,res)=>{
//  console.log(req.body)

// })

module.exports = router;
