const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const User = require("../Models/UserModel");

const hashPassword = async (password) => {
  const salt = await bcrypt.genSalt(10);
  return bcrypt.hash(password, salt);
};
const comparePassword = async (row, hash) => {
  return await bcrypt.compare(row, hash);
};
const createToken = (id) => {
  return jwt.sign({ id: id }, process.env.TOKEN);
};

const registerUser = async (req, res) => {
  try {
    const userName = await User.findOne({ userName: req.body.userName });
    const eMail = await User.findOne({ email: req.body.email });
    if (userName == null && eMail == null) {
      // encrypt password
      const hashedPassword = await hashPassword(req.body.password);
      // create new user object and save data to DB
      const newUser = new User({
        userName: req.body.userName,
        email: req.body.email,
        first_name: req.body.firstName,
        last_name: req.body.lastName,
        password: hashedPassword,
      });
      const user = await newUser.save();
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
    } else {
      // if user exist check password
      const validate = comparePassword(req.body.password, user.password);
      if (validate) {
        // create token and save to db an send as cookie    //
        const token = createToken(user._id);
        await User.updateOne({ _id: user._id }, { $set: { token: token } });
        res.cookie("blogToken", token, {
          maxAge: 3600000,
          httpOnly: true,
        });
        res.status(200).json("Login Successfull");
      } else {
        res.status(400).json("Incorrect Password");
      }
    }
  } catch (e) {
    res.status(500).json(e.message);
  }
};

const userVerification=(req)=>{
  if (req.cookies.blogToken) { 
  const verify = jwt.verify(req.cookies.blogToken, process.env.TOKEN);
  const user=User.findOne({_id:verify.id})
  if(user){
    return true
  }else{
    return false
  }
}else{
  return false
}
}
const getUserId=(req,res)=>{
  if(userVerification({req})){
    const verify = jwt.verify(req.cookies.blogToken, process.env.TOKEN)
    return verify.id
  }else{
    res.status(403).json("Forbidden");
    return null
  }
  

}

module.exports = {
  hashPassword,
  createToken,
  comparePassword,
  registerUser,
  login,
  userVerification,
  getUserId,
};
