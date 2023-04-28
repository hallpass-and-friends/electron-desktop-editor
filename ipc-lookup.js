const path = require('path');
const fs = require('fs');

//lookup() is used to illustrate communication between main and a page (renderer)
const lookup = () => {
  try {
    const directory = path.join(__dirname, "assets"); //the assets directory
    return fs.readdirSync(directory);
  } catch (error) {
    return [`ERROR: ${error.message || error}`];
  }
}

module.exports = lookup;