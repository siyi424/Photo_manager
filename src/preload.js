const { contextBridge, ipcRenderer } = require('electron/renderer');
const sharp = require('sharp');
const { ReadDir } = require('./script/ReadDir');
const { listItem } = require('./script/ListItem');
const { waitForElm } = require('./script/WaitForElm');
const {listImages} = require('./script/ListImages');
const path = require('node:path');
const { execSync } = require('child_process');


contextBridge.exposeInMainWorld('electronAPI', {
  openFile: () => ipcRenderer.invoke('dialog:openFile'),
  getRootDir: () => {return path.resolve(process.cwd())},
});

contextBridge.exposeInMainWorld('common', {
    readDir: (path, formats) => ReadDir(path, formats),
    waitForElm: (selector) => waitForElm(selector),
    listItem: (items, container, className) => listItem(items, container, className),
    listImages: (items, container) => listImages(items, container),
    execSync: (command) => execSync(command)
  });

contextBridge.exposeInMainWorld('sharp', {
  runsharp: (imgpath,thumbpath, width, height) => {
    return sharp(imgpath).resize(width, height, {fit: 'fill'}).toFile(thumbpath)
  }

});

console.log('preload.js loaded');