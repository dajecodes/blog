const express = require("express");
const User = require("../Models/UserModel");
const userAPIs= require("../APIs/UserAPI")
// create router
const router = express.Router();

router.route("/test").post((req, res) => {
  console.log(req.body);
  res.send('user test');
});

// update user
router.route("/update/:id").put(async (req, res) => {
  userAPIs.updateUser(req,res)
});
// delete user
router.route("/delete/:id").delete(async (req,res)=>{
     userAPIs.deleteUser(req,res)  
  
});

// get user
router.route("/te").get(async(req,res)=>{
    res.send("get")
})
// fallow user
// unfallow user

// export router
module.exports = router;
