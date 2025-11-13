const path = require("path");
const fs = require("fs");
const https = require("https");
const { protocol } = require("electron");

const { app, BrowserWindow, ipcMain, shell } = require("electron");

const isDev = process.env.IS_DEV === "true";

// Define the video directory path
const { SerialPort } = require("serialport");

let mainWindow;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1024,
    height: 650,
    autoHideMenuBar: true,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
      contextIsolation: true,
      nodeIntegration: false, // keep secure
    },
  });

  const startURL =
    process.env.IS_DEV === "true"
      ? "http://localhost:5173"
      : `file://${path.join(__dirname, "../dist/index.html")}`;

  mainWindow.loadURL(startURL);
}

app.whenReady().then(() => {
  createWindow();

  // 🔍 List available serial ports to find your BeeTek shoe
  const { SerialPort, ReadlineParser } = require("serialport");
  const { ReadlineParser: Parser } = require("@serialport/parser-readline");

  SerialPort.list().then((ports) => {
    console.log("Available serial ports:");
    ports.forEach((port) => console.log(port.path, port.friendlyName));
  });

  // ⚙️ Replace COM3 with your BeeTek device’s COM port
  const port = new SerialPort({
    path: "COM3", // 👈 change this to your actual port
    baudRate: 9600, // check BeeTek docs for exact baud rate
  });

  const parser = port.pipe(new (require("@serialport/parser-readline").ReadlineParser)({ delimiter: "\r\n" }));

  port.on("open", () => {
    console.log("✅ BeeTek device connected on COM4");
  });

  parser.on("data", (data) => {
    console.log("🃏 Received from BeeTek:", data);

    // send to React if needed
    if (mainWindow) {
      mainWindow.webContents.send("beetek-data", data);
    }
  });

  port.on("error", (err) => {
    console.error("❌ Serial Port Error:", err.message);
  });
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") app.quit();
});
