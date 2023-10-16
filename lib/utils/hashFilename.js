const crypto = require('crypto');

const hashFilename = (filename) => {
  return crypto.createHash('md5')
  .update(filename)
  .digest('hex')
}

module.exports = {
  hashFilename
}