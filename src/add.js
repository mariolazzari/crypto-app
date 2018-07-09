const { remote } = require("electron");
const ipc = require("electron").ipcRenderer;

// close add window
const closeBtn = document.getElementById("closeBtn");
closeBtn.addEventListener("click", e => {
    // close current window
    let window = remote.getCurrentWindow();
    window.close();
});

// update button
const updateBtn = document.getElementById("updateBtn");
updateBtn.addEventListener("click", () => {
    // send notify val
    ipc.send("update-notify-val", document.getElementById("notifyVal").value);

    // close current window
    let win = remote.getCurrentWindow();
    win.close();
});
