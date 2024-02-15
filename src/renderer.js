const btn = document.getElementById('btn');
const filePathElement = document.getElementById('rootPath');
let root;

btn.addEventListener('click', async () => {
  root = await window.electronAPI.openFile();
  //add root path display
  filePathElement.innerText = root;

  //get subfiles names
  const formats = null;
  const subfolders_pr = window.common.readDir(root, formats);

  //list names as <li>
  subfolders_pr.then((result) => {
    console.log('renderer:', result);
    const div_sidebar = document.getElementById('sidebar');
    const className = 'subFolders';
    window.common.listItem(result, div_sidebar, className);
  }); 
});

window.common.waitForElm('.subFolders').then((elm) => {
  console.log('subFolders are loaded successfully!');
  const li_folders = document.querySelectorAll('.subFolders');
  console.log('render: ', li_folders);
  li_folders.forEach(item => {
    item.addEventListener('click', (event) => {
      const folderName = event.target.textContent; 
      
      // const img_pr = window.common.readDir()
      console.log(folderName);
    })
  });

})

