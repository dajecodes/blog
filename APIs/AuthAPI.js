const jwt = require("jsonwebtoken");
const bcryptS = require("../Common/Statergie/BCryptStatergy");
const User = require("../Models/UserModel");
const JWTStatergy = require('../Common/Statergie/JWTStatergy')



const registerUser = async (req, res) => {  
    try {
      const userName = await User.findOne({ userName: req.body.userName });
      const eMail = await User.findOne({ email: req.body.email });
      if (userName == null && eMail == null) {
        // encrypt password
        req.body.password = await bcryptS.hashPassword(req.body.password);
        // create new user object and save data to DB
        const newUser = new User(req.body);           
        await newUser.save();
        res.status(200).json("User Registration Successfull");
      } else {
        res.status(409).json("Username or email Already Exists");  
      }
    } catch (e) {
      res.status(500).json(e.message);
    }
  
};

const login = async (req, res) => {
 
    try {
      // search user reff to given email
      const user = await User.findOne({ email: req.body.email });
      if (user === null) {
        res.status(404).json("User Not Found");
        // throw()
      } else {
        // if user exist check password
        const validate = bcryptS.comparePassword(req.body.password, user.password);
        if (validate) {
          // create token and save to db an send as cookie    // 
          console.log('valdate')         
          const token = JWTStatergy.createToken(user._id)          
          res.header('authorization',token)          
          res.status(200).json("Login Successfull");
        } else {
          res.status(400).json("Incorrect Password");
        }
      }
    } catch (e) {
      res.status(500).json(e.message);
    }
 
};

const userVerification = (req) => {
  try{
  if (req.cookies.blogToken) {
    const verify = JWTStatergy.verify(req.cookies.blogToken, process.env.TOKEN);
    const user = User.findOne({ _id: verify.id });
    if (user) {
      return true;
    } else {
      return false;
    }
  } else {
    return false;
  }
}catch(e){
  console.log(e.message)
}
};
const isUserId=async (id)=>{
  try{
  const user = await User.findById(id);
  console.log(user)
  if(user){
    return true
  }else{
    return false
  }
}catch(e){
  console.log(e.message)
}
}
const getUserId =(req, res, status = true) => {
  console.log(req)
  if (req.cookies.blogToken) {
    const verify = jwt.verify(req.cookies.blogToken, process.env.TOKEN);    
    if (isUserId(verify.id)) {
      return {id:verify.id};
    } else {
      if (status) {
        res.status(403).json("Forbidden");
      }

      return {id:null};
    }
  } else {
    if (status) {
      res.status(403).json("Forbidden");
    }
    return {id:null};
  }
};

module.exports = { 
  registerUser,
  login,
  userVerification,
  getUserId,
  isUserId,
};
     