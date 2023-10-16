const fsPromise = require('node:fs/promises');
const fs = require('node:fs');
const path = require('node:path');

const createUploadDir = async(path) => {

  try {
    if(!fs.existsSync(path)) {
      const dir = await fsPromise.mkdir(path, { recursive: true });
    }
  } catch(err) {
    console.error(err.message);
  }
}

module.exports = {
  createUploadDir
}