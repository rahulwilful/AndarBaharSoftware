const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("electronAPI", {
  onBeetekData: (callback) =>
    ipcRenderer.on("beetek-data", (event, data) => callback(data)),
});
