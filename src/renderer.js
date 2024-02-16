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

  li_folders.forEach(item => {
    item.addEventListener('click', (event) => {
      //get root 
      const root = filePathElement.innerText;
      const folderName = event.target.textContent;

      const path = root + '/' + folderName;
      const formats = ['JPG'];
      const img_pr = window.common.readDir(path, formats);

      img_pr.then((imgs) => {
        //create thumbnails
        const tmp = window.electronAPI.getRootDir() + '/tmp';

        imgs.forEach(img => {
          const tb_path = tmp + '/' + 'thumb_' + img;
          const org_path = path + '/' + img;

          console.log('thumbnails');
          window.sharp.runsharp(org_path, tb_path, 200, 200).then(() => {
            console.log('Thumbnail generated successfully');
          }).catch(err => {
            console.error('Error generating thumbnail:', err);
          });
        });

        //display thumbnails
        const thumbPaths = imgs.map(str => tmp + '/' + 'thumb_' + str);
        console.log('tb: ', thumbPaths);
        const div_imgs = document.getElementById('div-imgs');
        window.common.listImages(thumbPaths, div_imgs);
        
        console.log(folderName);
      })
    });
  })
})

