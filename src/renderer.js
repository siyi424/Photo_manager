const btn = document.getElementById('btn')
const filePathElement = document.getElementById('rootPath')

btn.addEventListener('click', async () => {
  const filePath = await window.electronAPI.openFile()
  const savePath = await window.electronAPI.getDirname() + '/' + 'root.json'

  filePathElement.innerText = filePath;
  formats = ['JPG', 'NEF'];
  result = window.filetree.readDir(filePath, formats);
  // save result to JSON
  console.log(result);
  window.filetree.saveJSon(result, savePath);

})