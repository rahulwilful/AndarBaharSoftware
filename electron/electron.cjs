const path = require("path");
const fs = require("fs");
const https = require("https");
const { protocol } = require("electron");
const net = require("net");


const { app, BrowserWindow, ipcMain, shell } = require("electron");
const { SerialPort } = require("serialport");
const { ReadlineParser } = require("@serialport/parser-readline");

// Global reference to the main window and serial port
let mainWindow;
let activePort = null;

// Function to create the main window
function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1024,
    height: 650,
    autoHideMenuBar: true,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      contextIsolation: true,
      nodeIntegration: false
    }
  });

  // Load the correct URL based on the environment
  if (process.env.IS_DEV === 'true') {
    mainWindow.loadURL('http://localhost:5173');
    mainWindow.webContents.openDevTools(); // Open DevTools in development
  } else {
    const filePath = path.join(__dirname, '../dist/index.html');
    mainWindow.loadFile(filePath);
  }

  // Handle window close
  mainWindow.on('closed', () => {
    mainWindow = null;
  });
}

// Function to connect to the BeeTek device via serial port
async function connectToBeeTek() {
  try {
    const ports = await SerialPort.list();
    console.log(
      'Available ports:',
      ports.map(p => p.path)
    );

    for (const portInfo of ports) {
      try {
        console.log(`Attempting to connect to ${portInfo.path}...`);

        const port = new SerialPort({
          path: portInfo.path,
          baudRate: 9600,
          autoOpen: false
        });

        await new Promise((resolve, reject) => {
          port.open(err => {
            if (err) reject(err);
            else resolve();
          });
        });

        console.log(`Connected to BeeTek on ${portInfo.path}`);
        activePort = port;

        // Set up data parser
        const parser = port.pipe(new ReadlineParser({ delimiter: '\r\n' }));

        // Handle incoming data
        parser.on('data', data => {
          console.log('Received from BeeTek:', data);
          if (mainWindow) {
            mainWindow.webContents.send('beetek-data', data);
          }
        });

        // Handle port errors
        port.on('error', err => {
          console.error('Serial port error:', err.message);
        });

        return; // Exit loop on successful connection
      } catch (err) {
        console.log(`Failed to connect to ${portInfo.path}:`, err.message);
      }
    }

    console.log('BeeTek device not found on any available port.');
  } catch (err) {
    console.error('Error listing serial ports:', err);
  }
}

// Close the serial port when the app quits
app.on('will-quit', () => {
  if (activePort && activePort.isOpen) {
    activePort.close(err => {
      if (err) console.error('Error closing serial port:', err);
      else console.log('Serial port closed.');
    });
  }
});


// Function to connect to Safe Shoe device
function connectToSafeShoe() {
  const SAFE_SHOE_IP = "192.168.0.7";
  const SAFE_SHOE_PORT = 80; // Replace with the correct port if different

  const client = new net.Socket();
  console.log(`🔍 Connecting to Safe Shoe at ${SAFE_SHOE_IP}:${SAFE_SHOE_PORT}...`);

  client.connect(SAFE_SHOE_PORT, SAFE_SHOE_IP, () => {
    console.log(`✅ Connected to Safe Shoe device!`);
  });

  client.on("data", (data) => {
    const receivedData = data.toString().trim();
    console.log("🃏 Received from Safe Shoe:", receivedData);
    if (mainWindow) {
      mainWindow.webContents.send("safe-shoe-data", receivedData);
    }
  });

  client.on("error", (err) => {
    console.error("❌ Safe Shoe Connection Error:", err.message);
  });

  client.on("close", () => {
    console.log("⚠️ Safe Shoe connection closed.");
  });
}


const dgram = require("dgram");

function listenSafeShoeUDP() {
  console.log("listenSafeShoeUDP called")
  const server = dgram.createSocket("udp4");

  server.on("listening", () => {
    const address = server.address();
    console.log(`📡 Listening UDP on ${address.address}:${address.port}`);
  });

  server.on("message", (msg, rinfo) => {
    // only accept packets from Safe Shoe
    if (rinfo.address === "192.168.0.7") {
      console.log("🃏 Safe Shoe UDP FROM:", rinfo.address, rinfo.port);
      console.log("🃏 RAW:", msg);
      console.log("🃏 HEX:", msg.toString("hex"));
      console.log("🃏 TEXT:", msg.toString("utf8"));

      if (mainWindow) {
        mainWindow.webContents.send(
          "safe-shoe-data",
          msg.toString("utf8")
        );
      }
    }
  });

  server.on("error", (err) => {
    console.error("❌ UDP Error:", err);
    server.close();
  });

  // bind to ALL ports
  server.bind(0);
}




function connectToSafeShoeHTTP() {
  const SAFE_SHOE_IP = "192.168.0.7";
  const SAFE_SHOE_PORT = 80; // or 443 for HTTPS

  const options = {
    hostname: SAFE_SHOE_IP,
    port: SAFE_SHOE_PORT,
    path: "/data", // Replace with the correct endpoint
    method: "GET",
  };

  const req = https.request(options, (res) => {
    res.on("data", (data) => {
      const receivedData = data.toString().trim();
      console.log("🃏 Received from Safe Shoe:", receivedData);
      if (mainWindow) {
        mainWindow.webContents.send("safe-shoe-data", receivedData);
      }
    });
  });

  req.on("error", (err) => {
    console.error("❌ Safe Shoe HTTP Error:", err.message);
  });

  req.end();
}


app.whenReady().then(() => {
  createWindow();
  connectToBeeTek(); // try connecting
  //listenSafeShoeUDP();
  // connectToSafeShoe();
  connectToSafeShoeHTTP()

});

// Initialize the app
/* app.whenReady().then(() => {
  createWindow();
  connectToBeeTek(); // Attempt to connect to BeeTek device
}); */

// Handle all windows being closed
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

// Handle app activation (macOS)
app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

// Expose serial port functions to the renderer process via IPC
ipcMain.handle('list-ports', async () => {
  return await SerialPort.list();
});

ipcMain.handle('connect-port', async (event, portPath) => {
  try {
    const port = new SerialPort({
      path: portPath,
      baudRate: 9600,
      autoOpen: false
    });

    await new Promise((resolve, reject) => {
      port.open(err => {
        if (err) reject(err);
        else resolve();
      });
    });

    activePort = port;
    return { success: true, message: `Connected to ${portPath}` };
  } catch (err) {
    return { success: false, message: err.message };
  }
});
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             ;