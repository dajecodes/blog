const User = require("../Models/UserModel");
const authAPIs = require("./AuthAPI");
const bcryptS = require("../Common/Statergie/BCryptStatergy");

const updateUser = async (req, res) => {
  try {
    if (req.body.password) {
      req.body.password = bcryptS.hashPassword(req.body.password);
    }
    await User.findByIdAndUpdate(req.userId, {
      $set: req.body,
    });
    res.status(200).json("User Updated Successfully");
  } catch (e) {
    res.status(500).json(e.message);
  }
};

const deleteUser = async (req, res) => {
  try {
      await User.findByIdAndDelete(req.userId);
      res.status(200).json("User deleted Successfully");
    
  } catch {
    res.status(500).json(e.message);
  }
};
const getUser = async (req, res) => {
  const { id } = authAPIs.getUserId(req, res, false);
  try {
    const user = await User.findById(req.params.id);
    if (id) {
      if (id === req.params.id) {
        const {
          userName,
          firstName,
          lastName,
          profilePic,
          post,
          phoneNo,
          fallowers,
          fallowing,
          ...others
        } = user;
        res.send({
          userName,
          firstName,
          lastName,
          profilePic,
          post,
          phoneNo,
          fallowers,
          fallowing,
        });
      } else {
        const { userName, firstName, lastName, profilePic, post, ...others } =
          user;
        res.send({ userName, firstName, lastName, profilePic, post });
      }
    } else {
      const { userName, firstName, profilePic, ...others } = user;
      res.send({ userName, firstName, profilePic });
    }
  } catch (e) {
    res.status(500).json(e.message);
  }
};
const fallowUser = async (req, res) => {
  const { id } = authAPIs.getUserId(req, res);
  try {
    const fallowUserId = req.params.id;
    console.log(req.params.id);
    if (id) {
      console.log(authAPIs.isUserId(fallowUserId));
      if (authAPIs.isUserId(fallowUserId)) {
        if (id != fallowUserId) {
          const currentUser = await User.findById(id);
          const fallowUser = await User.findById(fallowUserId);

          if (!currentUser.fallowers.includes(fallowUserId)) {
            await currentUser.updateOne({
              $push: { fallowings: fallowUserId },
            });
            await fallowUser.updateOne({ $push: { fallowers: id } });
          } else {
            res.status(403).json("You alredy fallowed this user");
          }
        } else {
          res.status(403).json("You can't fallow yourself");
        }
      } else {
        res.status(500).json("error");
      }
    }
  } catch (e) {
    res.status(500).json(e.message);
  }
};
const unfallowUser = (req, res) => {
  const { currentUserId } = authAPIs.getUserId(req, res);
  const unfallowUserId = req.params.id;
  if (currentUserId) {
    if (authAPIs.isUserId(unfallowUserId)) {
    } else {
      res.status(500).json("error");
    }
  }
};

module.exports = {
  updateUser,
  deleteUser,
  getUser,
  fallowUser,
  unfallowUser,
};
