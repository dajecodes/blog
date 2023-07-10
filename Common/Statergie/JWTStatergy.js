const jwt = require("jsonwebtoken");


const createToken =(id) => {
  return jwt.sign({exp:Math.floor(Date.now()/1000)+(60*60*process.env.TOKEN_EXP_DUE),id: id }, process.env.SECRET_KEY);
};

const verifyToken = (token) => {
  if (token === null) return null;
  return  jwt.verify(token, process.env.SECRET_KEY, (err, user) => {
    if (err){
      return null;
    }    
    return user.id;
  });
  
};

module.exports = {
  createToken,
  verifyToken,
};
