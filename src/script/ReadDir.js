function ReadDir(dir, formats) {
    const fs = require('fs');
    const fsPromise = fs.promises;
    let resList = [];
    
    fsPromise.readdir(dir, 'utf8').then(folders => {
        console.log(folders);
        folders.forEach(folder => {
            resList.push(folder);
            if (formats != null) {
                resList = resList.filter((res) => {
                    const fileExt = res.split('.').pop();
                    return formats.some(format => format === fileExt );
            })};
        });
        return resList;
    });
};

module.exports = {
    ReadDir
};




