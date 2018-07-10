const electron = require("electron");
const path = require("path");
const BrowserWindow = electron.remote.BrowserWindow;
const axios = require("axios");
const ipc = electron.ipcRenderer;

let price = document.getElementById("price");
let targetPrice = document.getElementById("targetPrice");
let targetPriceVal;

const notification = {
    title: "BTC notification",
    body: "BTC just beat your target price",
    icon: path.join(__dirname, "../assets/img/btc.png")
};

// get btc price
const getBTC = () => {
    axios
        .get(
            "https://min-api.cryptocompare.com/data/price?fsym=ETH&tsyms=BTC,USD,EUR"
        )
        .then(res => {
            price.innerHTML = "€" + res.data.EUR;

            console.log("data", res.data.EUR);
            console.log("price val", targetPriceVal);

            if (targetPrice.innerHTML != "" && targetPriceVal < res.data.EUR) {
                const myNotification = new window.Notification(
                    notification.title,
                    notification
                );
                //myNotification.show();
            }
        })
        .catch(err => console.log(err));
};

getBTC();
setInterval(getBTC, 10000);

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
    targetPriceVal = Number(arg);
    targetPrice.innerHTML = targetPriceVal.toLocaleString("en");
});
