const global = {
  APP_NAME: 'Hello Electron Desktop'
}
const dev = {
  APP_VERSION: "0.1-dev"
}
const production = {
  APP_VERSION: "0.1-beta"
}

const initializeEnv = (isProduction) => {
  const env = {
    ...global,
    ...(isProduction ? production : dev)
  };
  for (const key of Object.keys(env)) {
    process.env[key] = env[key];
  }
}

module.exports = initializeEnv;