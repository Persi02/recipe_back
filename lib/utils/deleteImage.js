const fs = require('fs')

module.exports = {
  deleteImage: (path) => {
    if(fs.existsSync(path)) {
      fs.unlink(path, (err) => {
        if(err) throw Error('Error occuring when deleting file');
        console.log(`${path} was deleted`)
      })
    } else {
      console.log('Path does not exists')
    }
  }
}