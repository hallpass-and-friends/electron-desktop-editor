const path = require('path');

module.exports = {
  packagerConfig: {
    icon: '/assets/icons/icon'
  },
  rebuildConfig: {},
  makers: [
    {
      name: '@electron-forge/maker-squirrel',
      config: {
        iconUrl: 'https://media.hallpassandfriends.com/media/electron/app-icons/hello-electron-icon-256.ico',
        setupIcon: path.join(__dirname, '/assets/icons/icon.ico')
      },
    },
    {
      name: '@electron-forge/maker-zip',
      platforms: ['darwin'],
    },
    {
      name: '@electron-forge/maker-deb',
      config: {
        options: {
          icon: '/assets/icons/icon.png'
        }
      },
    },
    {
      name: '@electron-forge/maker-rpm',
      config: {
        options: {
          icon: '/assets/icons/icon.png'
        }
      },
    },
  ],
};
