const { app, BrowserWindow } = require("electron");
const path = require("path");
require("electron-reload")(__dirname);

app.setName("SpotiBy");
app.setAppUserModelId("com.spotiby.app");

app.disableHardwareAcceleration();

function createWindow() {
  const win = new BrowserWindow({
    width: 490,
    height: 760,
    resizable: false,
    center: true,
    autoHideMenuBar: true,
    title: "SpotiBy",
    icon: path.join(process.cwd(), "Assets", "SpotBy.png"),
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
    },
  });

  win.loadFile(path.join(__dirname, "src", "index.html"));
}

app.whenReady().then(createWindow);

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") app.quit();
});

app.on("activate", () => {
  if (BrowserWindow.getAllWindows().length === 0) createWindow();
});
