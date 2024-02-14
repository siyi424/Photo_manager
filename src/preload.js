const { contextBridge, ipcRenderer } = require('electron/renderer')
const { ReadDir } = require('./script/ReadDir');
const { listItem } = require('./script/ListItem');
const { waitForElm } = require('./script/WaitForElm');

contextBridge.exposeInMainWorld('electronAPI', {
  openFile: () => ipcRenderer.invoke('dialog:openFile'),
  getDirname: () => __dirname,
});

contextBridge.exposeInMainWorld('common', {
    readDir: (path, formats) => ReadDir(path, formats),
    waitForElm: (selector) => waitForElm(selector),
    listItem: (items, container, className) => listItem(items, container, className),
});

console.log('preload.js loaded');