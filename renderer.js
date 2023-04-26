
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

document.querySelectorAll('button')
  .forEach(el => {
    el.addEventListener('click', action[el.id]);
  });