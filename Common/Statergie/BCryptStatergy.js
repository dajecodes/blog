const bcrypt= require('bcrypt')

const hashPassword = async (password) => {
    const salt = await bcrypt.genSalt(10);
    return bcrypt.hash(password, salt);
  };
  const comparePassword = async (row, hash) => {
    return await bcrypt.compare(row, hash);
  };

  module.exports={
    hashPassword,
    comparePassword,
  }