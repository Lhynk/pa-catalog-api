const { GOOGLE } = require('../helpers/google')

async function getFilesFromFolder(req, res) {

  console.log('in')
  const test = await GOOGLE.DRIVE.getFilesFromFolder();
  console.log(test);

  return res.status(200).json(test)
}

module.exports = {
  getFilesFromFolder
}
