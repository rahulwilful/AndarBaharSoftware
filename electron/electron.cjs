const path = require("path");
const fs = require("fs");
const https = require("https");
const { protocol } = require("electron");

const { app, BrowserWindow, ipcMain, shell } = require("electron");
const { SerialPort } = require("serialport");
const { ReadlineParser } = require("@serialport/parser-readline");

let mainWindow;
let activePort = null; // store connected port

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1024,
    height: 650,
    autoHideMenuBar: true,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
      contextIsolation: true,
      nodeIntegration: false,
    },
  });

  const startURL =
    process.env.IS_DEV === "true"
      ? "http://localhost:5173"
      : `file://${path.join(__dirname, "../dist/index.html")}`;

  mainWindow.loadURL(startURL);
}

// -----------------------------------------------------
// 🔌 TRY COM1 to COM6 UNTIL SUCCESSFUL CONNECTION
// -----------------------------------------------------
async function connectToBeeTek() {
  const COM_PORTS = ["COM1", "COM2", "COM3", "COM4", "COM5", "COM6"];

  console.log("🔍 Searching BeeTek device on COM1–COM6...");

  for (let com of COM_PORTS) {
    try {
      console.log(`Trying ${com} ...`);

      const port = new SerialPort({
        path: com,
        baudRate: 9600,
        autoOpen: false,
      });

      await new Promise((resolve, reject) => {
        port.open((err) => {
          if (err) reject(err);
          else resolve();
        });
      });

      console.log(`✅ Connected BeeTek device on ${com}`);
      activePort = port;

      const parser = port.pipe(new ReadlineParser({ delimiter: "\r\n" }));

      parser.on("data", (data) => {
        console.log("🃏 Received from BeeTek:", data);

        if (mainWindow) {
          mainWindow.webContents.send("beetek-data", data);
        }
      });

      port.on("error", (err) => {
        console.error("❌ Serial Port Error:", err.message);
      });

      return; // stop loop — SUCCESS connected
    } catch (err) {
      console.log(`❌ ${com} unavailable:`, err.message);
    }
  }

  console.log("⚠️ BeeTek device not found on COM1–COM6.");
}

app.whenReady().then(() => {
  createWindow();
  connectToBeeTek(); // try connecting
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") app.quit();
});
