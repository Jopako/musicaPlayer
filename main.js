const { app, BrowserWindow } = require('electron');
const path = require('path');

app.setName("SpotiBy");
app.setDesktopName("SpotiBy");
app.setAppUserModelId("com.spotiby.app"); 
app.dock && app.dock.setIcon(path.join(process.cwd(), 'Assets', 'SpotBy.png'));

function createWindow() {
  const win = new BrowserWindow({
    width: 490,               // largura inicial
    height: 760,              // altura inicial
    resizable: false,         // impede o usuário de redimensionar
    movable: true,            // permite mover
    minimizable: false,        // permite minimizar
    maximizable: false,       // impede maximizar
    center: true,             // centraliza na tela ao abrir
    autoHideMenuBar: true,      // oculta a barra de menu
    frame: true,       // remove a borda padrão
     transparent: false, // se quiser transparência total, coloca true
    title: "SpotiBy",    // título da janela
    icon: path.join(process.cwd(), 'Assets', 'SpotBy.png'),
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
    }
  });




  win.loadFile(path.join(__dirname, 'src', 'index.html'));

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

