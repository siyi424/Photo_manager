const { contextBridge, ipcRenderer } = require('electron/renderer')
const { getAllFilesFromFolder } = require('./script/FileTree');

contextBridge.exposeInMainWorld('electronAPI', {
  openFile: () => ipcRenderer.invoke('dialog:openFile')
});

contextBridge.exposeInMainWorld('filetree', {
    getFileTree: (path) => getAllFilesFromFolder(path),
});

console.log('preload.js loaded');