const { app, BrowserWindow, shell, ipcMain, dialog } = require('electron');
const path = require('path');
const fs = require('fs');

const initializeEnv = require('./env');

const PLATFORM = {
  DARWIN: 'darwin'
};

//lookup() is used to illustrate communication between main and a page (renderer)
const lookup = () => {
  try {
    const directory = path.join(__dirname, "assets"); //the assets directory
    return fs.readdirSync(directory);
  } catch (error) {
    return [`ERROR: ${error.message || error}`];
  }
}

const promptToClose = (app, mainWindow) => {
  dialog.showMessageBox(mainWindow, {
    type: 'info',
    buttons: ['Yes (quit)', 'No (cancel)'],
    cancelId: 1,
    defaultId: 1,
    title: 'Warning',
    message: 'Hey, wait! Are you sure you want to quit?',
    detail: "Press (Yes) to exit"
  }).then(({ response, checkboxChecked }) => {
    if (response === 0) {
      mainWindow.destroy()
      app.quit()
    }
  })
}

const createWindow = () => {
  const window = new BrowserWindow({
    width: 800, 
    height: 1200,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js')
    },
    icon: path.join(__dirname, '/assets/icons/icon.ico')
  });
  
  //allow renderer to "lookup" files on the file system
  ipcMain.handle('lookup', lookup);

  window.loadFile('index.html');

  window.webContents.setWindowOpenHandler((details) => {
    shell.openExternal(details.url);
    return { action: 'deny' };
  });

  window.on('close', e => {
    e.preventDefault();
    promptToClose(app, window);
  });

} /* end createWindow() */

app.whenReady()
  .then(() => {

    //add the app env variables
    initializeEnv(false); //todo: determine if app is in production or dev mode

    //create the main window
    createWindow();

    const test = process.env;

    //create a window when the app is activated and there are no windows
    app.on('activate', () => {
      if (BrowserWindow.getAllWindows().length === 0) {
        createWindow();
      }
    });
  });


app.on('window-all-closed', () => {
  if (process.platform !== PLATFORM.DARWIN) {
    app.quit();
  }
});