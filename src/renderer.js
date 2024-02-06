const btn = document.getElementById('btn')
const filePathElement = document.getElementById('rootPath')

btn.addEventListener('click', async () => {
  const filePath = await window.electronAPI.openFile()
  filePathElement.innerText = filePath
  result = window.filetree.getFileTree(filePath);
  console.log(result);
})