const { contextBridge, ipcRenderer } = require('electron/renderer')
const { ReadDir } = require('./script/ReadDir');
const { saveJSon } = require('./script/SaveJSon');

contextBridge.exposeInMainWorld('electronAPI', {
  openFile: () => ipcRenderer.invoke('dialog:openFile'),
  getDirname: () => __dirname,
});

contextBridge.exposeInMainWorld('filetree', {
    readDir: (path, formats) => ReadDir(path, formats),
    saveJSon: (data, path) => saveJSon(data, path),
});

console.log('preload.js loaded');