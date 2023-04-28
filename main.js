const { app, BrowserWindow, nativeTheme } = require('electron');

const initializeEnv = require('./env');
const buildMenu = require('./main-buildMenu');
const createWindow = require('./main-createWindow');
const {setupIPC} = require('./ipc-manager');

//hold references to all of the main components
const _store = {
  menu: null,
  window: null
};

const PLATFORM = {
  DARWIN: 'darwin'
};



app.whenReady()
  .then(() => {

    //set to dark mode
    nativeTheme.themeSource = "dark";

    //add the app env variables
    initializeEnv(false); //todo: determine if app is in production or dev mode

    //create the main window
    _store.window = createWindow(app);

    //build the application menu
    _store.menu = buildMenu(_store.window, process.platform === PLATFORM.DARWIN);

    //add the IPC
    setupIPC();


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