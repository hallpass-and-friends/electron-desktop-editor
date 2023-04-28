//Inter-Process Communication
const { ipcMain } = require('electron');

//list of IPC methods
const lookup = require('./ipc-lookup');
const themeMode = require('./ipc-themeMode');

function setupIPC() {

  //allow renderer to "lookup" files on the file system
  ipcMain.handle('lookup', lookup);

  //allow renderer to work with theme mode
  ipcMain.handle('themeMode', themeMode);
}


module.exports = {
  setupIPC,
};