const User = require("../Models/UserModel");
const authAPIs = require("./AuthAPI");

const test = (req, res) => {
  res.send("testing ok");
};

const updateUser = async (req, res) => {
  try {
    const id=authAPIs.getUserId(req,res)
    if (id)  {
      if (req.body.password) {
        req.body.password = authAPIs.hashPassword(req.body.password);
      }
      await User.findByIdAndUpdate(id, {
        $set: req.body,
      });
      res.status(200).json("User Updated Successfully");
    } 
  } catch (e) {
    res.status(500).json(e.message);
  }
};

const deleteUser=async (req,res)=>{
  try{
    const id=authAPIs.getUserId(req,res)
    if(id){
      await User.findByIdAndDelete(id)
      res.status(200).json("User deleted Successfully");
    }

  }catch{
    res.status(500).json(e.message)
  }
}

module.exports = {
  test,
  updateUser,
  deleteUser,
};
