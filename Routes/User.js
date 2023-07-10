const express = require("express");
const userAPIs = require("../APIs/UserAPI");
// create router
const router = express.Router();

// update user
router.route("/update").post(async (req, res) => {
   userAPIs.updateUser(req, res);
});
// delete user
router.route("/delete/:id").delete(async (req, res) => {
  userAPIs.deleteUser(req, res);
});

// get user
router.route("/get/:id").get(async (req, res) => {
  userAPIs.getUser(req, res);
});

// fallow user
router.route("/fallow/:id").get((req, res) => {
  
  userAPIs.fallowUser(req, res);
});

// unfallow user
router.route("/unfallow/:id").get((req, res) => {
  userAPIs.unfallowUser(req, res);
});

// export router
module.exports = router;
