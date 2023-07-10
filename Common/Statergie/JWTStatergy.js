const jwt = require("jsonwebtoken");


const createToken =(id) => {
  console.log('test')
  return jwt.sign({id: id }, process.env.SECRET_KEY);
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
