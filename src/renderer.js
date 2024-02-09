const btn = document.getElementById('btn')
const filePathElement = document.getElementById('rootPath')

btn.addEventListener('click', async () => {
  const filePath = await window.electronAPI.openFile()
  const savePath = await window.electronAPI.getDirname() + '/' + 'root.json'

  filePathElement.innerText = filePath
  result = window.filetree.getFileTree(filePath);
  // save result to JSON

  window.filetree.saveJSon(result, savePath);
  console.log(result);
})