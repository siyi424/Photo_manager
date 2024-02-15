const { contextBridge, ipcRenderer } = require('electron/renderer')
const { ReadDir } = require('./script/ReadDir');
const { listItem } = require('./script/ListItem');
const { waitForElm } = require('./script/WaitForElm');
const {listImages} = require('./script/ListImages');

contextBridge.exposeInMainWorld('electronAPI', {
  openFile: () => ipcRenderer.invoke('dialog:openFile'),
  getDirname: () => __dirname,
});

contextBridge.exposeInMainWorld('common', {
    readDir: (path, formats) => ReadDir(path, formats),
    waitForElm: (selector) => waitForElm(selector),
    listItem: (items, container, className) => listItem(items, container, className),
    listImages: (items, container) => listImages(items, container),
});

console.log('preload.js loaded');