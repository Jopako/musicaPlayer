const { app, BrowserWindow } = require('electron');
const path = require('path');

app.setName("SpotiBy");
app.setDesktopName("SpotiBy");
app.setAppUserModelId("com.spotiby.app"); 
app.dock && app.dock.setIcon(path.join(process.cwd(), 'Assets', 'SpotBy.png'));

function createWindow() {
  const win = new BrowserWindow({
    width: 490,
    height: 760,
    resizable: false,
    movable: true,
    minimizable: false,
    maximizable: false,
    center: true,
    autoHideMenuBar: true,
    frame: true,
    transparent: false,
    title: "SpotiBy",
    icon: path.join(process.cwd(), 'Assets', 'SpotBy.png'),
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
    }
  });

  win.loadFile(path.join(__dirname, 'src', 'index.html'));
}

// Só carrega electron-reload em desenvolvimento
if (process.env.NODE_ENV === 'development') {
  try {
    require('electron-reload')(__dirname, {
      electron: require(`${__dirname}/node_modules/electron`)
    });
  } catch (err) {
    console.log('Dev reload não encontrado, pulando...');
  }
}

app.commandLine.appendSwitch('disable-gpu');

app.commandLine.appendSwitch('disable-gpu');
app.commandLine.appendSwitch('log-level', '3'); // mostra só erros graves


app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) createWindow();
});
