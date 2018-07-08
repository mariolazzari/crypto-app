const electron = require("electron");
const path = require("path");
const BrowserWindow = electron.remote.BrowserWindow;

const notifyBtn = document.getElementById("notifyBtn");
notifyBtn.addEventListener("click", e => {
    const modalPath = path.join("file://", __dirname, "add.html");
    let win = new BrowserWindow({ width: 400, height: 200 });
    win.on("close", () => (win = null));
    win.loadURL(modalPath);
    win.show();
});
