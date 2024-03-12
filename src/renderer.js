const btn = document.getElementById('btn');
const filePathElement = document.getElementById('rootPath');
const btn_ps = document.getElementById('openPS');


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


// if want to create thumbnails,
// install sharp library && uncomment the commented lines
window.common.waitForElm('.subFolders').then((elm) => {
  console.log('subFolders are loaded successfully!');

  const li_folders = document.querySelectorAll('.subFolders');

  li_folders.forEach(item => {
    item.addEventListener('click', (event) => {
      //get root 
      const root = filePathElement.innerText;
      const folderName = event.target.textContent;

      const path = root + '/' + folderName;

      //change formats
      const formats = ['JPG'];

      const img_pr = window.common.readDir(path, formats);

      img_pr.then((imgs) => {
        //create thumbnails
        // const tmp = window.electronAPI.getRootDir() + '/tmp';

        // imgs.forEach(img => {
        //   // const tb_path = tmp + '/' + 'thumb_' + img;
        //   const org_path = path + '/' + img;

        // console.log('thumbnails');
        //   window.sharp.runsharp(org_path, tb_path, 200, 200).then(() => {
        //     console.log('Thumbnail generated successfully');
        //   }).catch(err => {
        //     console.error('Error generating thumbnail:', err);
        //   });
        // });

        //display thumbnails
        // const thumbPaths = imgs.map(str => tmp + '/' + 'thumb_' + str);
        // console.log('tb: ', thumbPaths);

        const imgPaths = imgs.map(str => path + '/' + str);
        const div_imgs = document.getElementById('div-imgs');
        window.common.listImages(imgPaths, div_imgs);

        console.log(folderName);
        return path;
      }).then((fp) => {
        let rawPaths = [];
        //add eventlistener to <img>
        const Images = document.querySelectorAll("img");
        console.log('display Images: ', Images);
        Images.forEach(img => {
          img.addEventListener('click', () => {
            console.log('clicked img src is: ', img.src);
            //send img.src to main process
            // window.electronAPI.getImgSrc(img.src);

            //deal the img.src & store the NEF filePath 
            let newPath = img.src.replace(/\.JPG$/, '.NEF');
            console.log('new rawPath: ', newPath);
            const index = rawPaths.indexOf(newPath);
            if (index !== -1) {
              // del
              rawPaths.splice(index, 1);
              img.style.opacity = '1';
            } else {
              // add
              rawPaths.push(newPath);
              img.style.opacity = '0.3'
            }
            console.log('rawPaths is: ', rawPaths);
          })
        });
        return [fp, rawPaths];
      }
      ).then(([fp, Paths]) => {
        //button: open Photoshop
        
        btn_ps.addEventListener('click', async () => {
          //get the stored NEF names
          //bcz I always use wsl2 to write and test the code. 
          //Here I have to change linux filepath format in wsl2 into the filepath in windows format
          console.log('rawPaths last edition: ', Paths);
          console.log('fp: ', fp);
          let nefPaths = Paths.map(str => str.replace('file:///mnt/d/', 'D:/'));
          nefPaths = nefPaths.map(str => str.replace(/\//g, '\\'));
          nefPaths = nefPaths.map(str => decodeURIComponent(str));
          console.log('NEF Paths: ', nefPaths);

          // const info = '"D:\\Photography-All\\20240302上海植物园\\DSC_3362.NEF"';

          let info = '';
          nefPaths.forEach(str => {
            info += '"' + str + '" ';
          });
          //command
          const cmd_pre = 'cmd.exe /c start photoshop ';
          const cmd = cmd_pre + info;

          console.log('cmd: ', cmd);
          try {
            window.common.execSync(cmd);
            console.log('Opened Photoshop with files: ${info}');
          } catch (error) {
            console.log('Error opening Photoshop with files');
          }
        });
      })

    });
  })
});








