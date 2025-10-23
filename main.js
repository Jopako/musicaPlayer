const { app, BrowserWindow } = require('electron');
const path = require('path');
function createWindow() {
  const win = new BrowserWindow({
    width: 490,               // largura inicial
    height: 760,              // altura inicial
    resizable: false,         // impede o usuário de redimensionar
    movable: false,            // permite mover
    minimizable: false,        // permite minimizar
    maximizable: false,       // impede maximizar
    center: true,             // centraliza na tela ao abrir
    autoHideMenuBar: true,    // oculta a barra de menu
    title: "SpotBy",    // título da janela
    icon: path.join(__dirname, 'icon.png'),
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
    }
  });
  // Carrega seu arquivo HTML principal
  win.loadFile(path.join(__dirname, 'src', 'index.html'));

  // win.webContents.openDevTools(); // <-- ativa console devtools (opcional)
}

app.commandLine.appendSwitch('disable-gpu');

app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) createWindow();
});
 

require('electron-reload')(__dirname, {
  electron: require(`${__dirname}/node_modules/electron`)
});

