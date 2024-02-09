const { contextBridge, ipcRenderer } = require('electron/renderer')
const { getAllFilesFromFolder } = require('./script/FileTree');
const { saveJSon } = require('./script/SaveJSon');

contextBridge.exposeInMainWorld('electronAPI', {
  openFile: () => ipcRenderer.invoke('dialog:openFile'),
  getDirname: () => __dirname,
});

contextBridge.exposeInMainWorld('filetree', {
    getFileTree: (path) => getAllFilesFromFolder(path),
    saveJSon: (data, path) => saveJSon(data, path),
});

console.log('preload.js loaded');