const btn = document.getElementById('btn');
const filePathElement = document.getElementById('rootPath');

btn.addEventListener('click', async () => {
  const filePath = await window.electronAPI.openFile();
  //add root path display
  filePathElement.innerText = filePath;

  //get subfiles names
  const formats = null;
  const subfolders_pr = window.common.readDir(filePath, formats);

  //list names as <li>
  subfolders_pr.then((result) => {
    console.log('renderer:', result);
    const folders_ul = document.getElementById('folders');
    const className = 'subFolders';
    window.common.listItem(result, folders_ul, className);
  }); 
});

window.common.waitForElm('.subFolders').then((elm) => {
  console.log('subFolders are loaded successfully!');
  const li_folders = document.querySelectorAll('.subFolders');
  console.log('render: ', li_folders);
  li_folders.forEach(item => {
    item.addEventListener('click', (event) => {
      const folderName = event.target.textContent; 
      console.log(folderName);
    })
  });

})

