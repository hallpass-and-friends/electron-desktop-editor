const { app, BrowserWindow } = require('electron');
const path = require('path');

const PLATFORM = {
  DARWIN: 'darwin'
};

const createWindow = () => {
  const window = new BrowserWindow({
    width: 800, 
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js')
    }
  });

  window.loadFile('index.html');
}

app.whenReady()
  .then(() => {
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