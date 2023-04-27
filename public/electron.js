const electron = require('electron');
// const {ipcMain} = require('electron');
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;
// require('../src/Bioma/config/db')
const path = require('path');
const isDev = require('electron-is-dev');
let mainWindow;


function createWindow() {
  
  mainWindow = new BrowserWindow({
    width: 1300, 
    height: 800, 
    minWidth: 1300, 
    minHeight: 800, 
    maxWidth: 1300, 
    maxHeight: 800 ,
    webPreferences: {
      nodeIntegration: true
    }});
  mainWindow.loadURL(isDev ? 'http://localhost:3000' : `file://${path.join(__dirname, '../build/index.html')}`);
  if (isDev) {
    // Open the DevTools.
    //BrowserWindow.addDevToolsExtension('<location to your react chrome extension>');
    mainWindow.webContents.openDevTools();
  }
  mainWindow.on('closed', () => mainWindow = null);
}

app.on('ready', createWindow);
// app.whenReady().then( () => {
//     createWindow();
//   ipcMain.on('message:hello', (event, message) => {
//       console.log('Recibido en el proceso principal');
//       mainWindow.webContents.send('message:back', 'Mensaje recibido en el main process');
//   });
// });

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow();
  }
});