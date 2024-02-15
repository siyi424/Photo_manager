function ReadDir(dir, formats) {
    const fs = require('fs');
    const fsPromise = fs.promises;

    //check this path is dir or file
    const stats = fs.statSync(dir);
    let proms;
    if (stats.isFile()) {
        proms = fsPromise.readFile(dir, 'utf-8');
    } else {
        proms = fsPromise.readdir(dir, 'utf8');
    };

    return proms.then(folders => {
        let resList = [];

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




