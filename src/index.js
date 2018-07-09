const electron = require("electron");
const path = require("path");
const BrowserWindow = electron.remote.BrowserWindow;
const axios = require("axios");
const ipc = electron.ipcRenderer;

let price = document.getElementById("price");
let targetPrice = document.getElementById("targetPrice");

// get btc price
const getBTC = () => {
    axios
        .get(
            "https://min-api.cryptocompare.com/data/price?fsym=ETH&tsyms=BTC,USD,EUR"
        )
        .then(res => (price.innerHTML = "€" + res.data.EUR))
        .catch(err => console.log(err));
};

getBTC();
setInterval(getBTC, 30000);

// update button event lisener
const notifyBtn = document.getElementById("notifyBtn");
notifyBtn.addEventListener("click", e => {
    const modalPath = path.join("file://", __dirname, "add.html");
    let win = new BrowserWindow({
        width: 400,
        height: 200,
        frame: false,
        alwaysOnTop: true
    });
    win.on("close", () => (win = null));
    win.loadURL(modalPath);
    win.show();
});

ipc.on("targetPriceVal", (e, arg) => {
    const targetPriceVal = Number(arg);
    targetPrice.innerHTML = targetPriceVal.toLocaleString("en");
});
