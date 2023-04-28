
const padding = (num, places, fill = "0") => {
  const st = `${num}`;
  const pad = new Array(Math.max(0, places - st.length)).fill(fill);
  return pad.join('') + st;
}

//update the title regularly
const updateTitle = () => {
  //get current time
  const d = new Date();
  document.title = `Electron Editor ▪️ ${padding(d.getHours(),2)}:${padding(d.getMinutes(),2)}:${padding(d.getSeconds(),2)}`;
}

//setup mode (dark | light)
const setupMode = async () => {
  const mode = await window.actions.themeMode();
  const isDark = mode === 'dark';
  const body = document.body;
  if (body?.classList) {
    console.log(`setting body is ${isDark ? 'dark' : 'light'}`);
    body.classList.toggle('dark-mode', isDark);
    body.classList.toggle('light-mode', !isDark);
    console.log(`body class is ${body.className}`);
  } else {
    console.log("Could not locate body", body);
  }
}


const notify = (title, body) => {
  const show = () => {
    const icon = "./assets/logo-32.png";
    const notification = new Notification(title, {body, icon} );
  }
  
  if (!("Notification" in window)) {
    alert("Notification is not supported");
  } else if (Notification.permission === "denied") {
    alert("Notifications have been denied");
  } else if (Notification.permission === "granted") {
    //show notification
    show();
  } else {
    Notification.requestPermission()
      .then((permission) => {
        if (permission === "granted") { 
          show();
        }
      });
  }
}

const action = {
  "btn_like": (e) => {
    e.preventDefault();
    notify("Feedback", "Glad you like it");
  },
  "btn_dislike": (e) => {
    e.preventDefault();
    notify("Feedback", "Sorry you not like it");
  },
  "btn_lookup": async (e) => {
    e.preventDefault();
    const el = document.getElementById('output');
    const files = await window.actions.lookup();    
    const results = Array.isArray(files) ? files.join('\n') : `An error occurred looking up the assets... \n${files}`;
    el.innerHTML = `ASSETS...\n(updated: ${new Date()})\n\n${results}`;    
  }
}

window.setInterval(updateTitle, 1000);
setupMode();

document.querySelectorAll('button')
  .forEach(el => {
    el.addEventListener('click', action[el.id]);
  });