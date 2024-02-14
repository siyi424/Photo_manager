function ReadDir(dir, formats) {
    const fs = require('fs');
    const fsPromise = fs.promises;
    let resList = [];


    fsPromise.readdir(dir, 'utf8').then(folders => {
        folders.forEach(folder => {
            resList.push(folder);
        });

        //filter formats
        if (formats != null) {
            resList = resList.filter((res) => {
                const fileExt = res.split('.').pop();
                return formats.some(format => format === fileExt);
            })
        };

        //sort subfolders
        resList.sort().reverse();
        console.log('resList: ', resList);
        return resList;
    });
};

module.exports = {
    ReadDir
};




