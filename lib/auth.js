const bcrypt = require('bcrypt');
const saltRound = 15;

const hashPassword = async(passToHash) => {
  return new Promise(async(resolve, reject) => {
    bcrypt.hash(passToHash, saltRound, (err, hash) => {
      if(err) {
        reject(err);
      }

      if(hash) {
        resolve(hash);
      } else {
        reject("Error when hashing password");
      }

    })
  })
}

const comparePassword = (userToLogPass, hashFromDB) => {
  return bcrypt.compareSync(userToLogPass, hashFromDB);
}

module.exports.auth = {
  hashPassword,
  comparePassword
}