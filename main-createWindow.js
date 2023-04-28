const { dialog, BrowserWindow, shell } = require('electron');
const path = require('path');

const promptToClose = (app, mainWindow) => {
  dialog.showMessageBox(mainWindow, {
    type: 'info',
    buttons: ['Yes (quit)', 'No (cancel)'],
    cancelId: 1,  //ESC will result in NO
    defaultId: 0, //YES will be selected
    title: 'Attention',
    message: 'Hey, wait! Are you sure you want to quit?',
    detail: "Press (Yes) to exit"
  }).then(({ response, checkboxChecked }) => {
    if (response === 0) {
      mainWindow.destroy()
      app.quit()
    }
  })
}

const createWindow = (app) => {
  const window = new BrowserWindow({
    width: 800, 
    height: 1200,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js')
    },
    icon: path.join(__dirname, '/assets/icons/icon.ico'),
  });
  
  window.loadFile('index.html');

  window.webContents.setWindowOpenHandler((details) => {
    shell.openExternal(details.url);
    return { action: 'deny' };
  });

  window.on('close', e => {
    e.preventDefault();
    promptToClose(app, window);
  });

  return window;
} /* end createWindow() */


module.exports = createWindow;