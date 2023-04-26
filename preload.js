window.addEventListener('DOMContentLoaded', () => {
  const replaceText = (elementId, text) => {
    const el = document.getElementById(elementId);
    if (el) {
      el.innerText = text;
    } else {
      //... show error message
    }
  }

  //add the dependency versions
  for (const dependency of ['chrome', 'node', 'electron']) {
    replaceText(`env-${dependency}-version`, process.versions[dependency]);
  }

  //add the environment variables
  for (const key of ['APP_NAME', 'APP_VERSION']) {
    replaceText(`env-${key}`, process.env[key]);
  }

  //add other variables
  for (const key of ['platform']) {
    replaceText(`env-${key}`, process[key]);
  }
})