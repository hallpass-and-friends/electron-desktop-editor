const { Menu, dialog, nativeImage } = require('electron');
const path = require('path');

function buildMenu(
  window, //the BrowserWindow,
  isMac, //are we on the MacOS platform (darwin)
) {

  const template = [
    {
      label: "🦝",
      submenu: [
        {
          label: "About...",
          role: "about"
        },
        {
          label: "Help...",
          role: "help"
        },
        {
          type: 'separator'
        },
        {
          role: 'toggleDevTools'
        },
        {
          type: 'separator'
        },
        {
          accelerator: "Ctrl+Q",
          role: isMac ? "close" : "quit"
        },
      ]
    },

    {
      label: "&File", 
      submenu: [
        {
          label: "New File",
          accelerator: "Ctrl+N",
          click() {
            NewFile();
          }
        },
        {
          label: "Open File...",
          accelerator: "Ctrl+O",
          click() {
            OpenFile();
          }
        },
        {
          label: "Save File",
          accelerator: "Ctrl+S",
          click() {
            SaveFile();
          }
        }, 
      ]
    },
    {
      label: "&Edit",
      role: "editMenu"
    },
  ];

  const menu = Menu.buildFromTemplate(template);
  Menu.setApplicationMenu(menu);
  return menu;
}

function NewFile() {
  console.log("New File()");
}

function OpenFile() {
  console.log("Open File()");
}

function SaveFile() {
  console.log("Save File");
}

function Exit() {
  console.log("Exit");
}

module.exports = buildMenu;