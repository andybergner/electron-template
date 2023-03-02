const { app, BrowserWindow, ipcMain } = require('electron');
const electronlocalshortcut = require('electron-localshortcut');
const path = require('path');
const remoteMain = require('@electron/remote/main');
const ipc = ipcMain;

if (process.platform == 'win32') app.setAppUserModelId(`electron-template`);
const client = {
  logger: new (require('./src/logger'))(),
};

function createWindow() {
  let win = new BrowserWindow({
    height: 600,
    width: 800,
    webPreferences: {
      nodeIntegration: true,
      enableRemoteModule: true,
      contextIsolation: false,
    },
  });

  win.loadFile('src/app/index.html');
  win.setMenu(null);

  remoteMain.initialize();
  remoteMain.enable(win.webContents);

  electronlocalshortcut.register(win, 'F5', () => {
    win.reload();
  });
}

app
  .whenReady()
  .then(() => {
    createWindow();
    client.logger.info('Application booted up successfully.');
  })
  .catch((error) => {
    client.logger.error('Something went wrong while boot the Application!');
    client.logger.error(error);
  });
