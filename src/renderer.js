const btn = document.getElementById('btn');
const filePathElement = document.getElementById('rootPath');

btn.addEventListener('click', async () => {
  const root = await window.electronAPI.openFile();
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
      //get root 
      const root = filePathElement.innerText;
      const folderName = event.target.textContent; 

      const path = root + '/' + folderName;
      const formats = ['JPG', 'NEF'];
      
      const img_pr = window.common.readDir(path, formats);
      img_pr.then((imgs) => {
        //get imgs full path
        const fullPaths = imgs.map(str => path + '/' + str);

        const div_imgs = document.getElementById('div-imgs');
        const className = 'imgs';
        window.common.listImages(fullPaths, div_imgs, className);
      });
      console.log(folderName);
    })
  });

})

