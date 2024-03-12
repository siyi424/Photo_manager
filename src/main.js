const {app, BrowserWindow, ipcMain, dialog} = require('electron/main');
const path = require('node:path');

async function handleFileOpen() {
    const { cancled, filePaths } = await dialog.showOpenDialog({
        properties: ['openDirectory']
    })
    if (!cancled) {
        console.log(filePaths);
        return filePaths[0];
    }
}


function createWindow () {
    const win = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            nodeIntegration: true,
            preload: path.join(__dirname, 'preload.js'),
            
        }
    });

    win.loadFile('./index.html');
    console.log('__dirname is:', __dirname);
}


app.whenReady().then(() => {
    ipcMain.handle('dialog:openFile', handleFileOpen)
    createWindow()
  
    app.on('activate', () => {
      if (BrowserWindow.getAllWindows().length === 0) createWindow()
    })
  })


//get img.src from render process & store the img.


  
  app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit()
  })