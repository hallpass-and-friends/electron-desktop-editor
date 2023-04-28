const { nativeTheme } = require('electron');

const themeMode = () => {
  return nativeTheme.shouldUseDarkColors ? 'dark' : 'light';
}

module.exports = themeMode;