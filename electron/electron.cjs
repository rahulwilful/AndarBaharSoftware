const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');
const { SerialPort } = require('serialport');
const { ReadlineParser } = require('@serialport/parser-readline');

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

// Initialize the app
app.whenReady().then(() => {
  createWindow();
  connectToBeeTek(); // Attempt to connect to BeeTek device
});

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
