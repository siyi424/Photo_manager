let getAllFilesFromFolder = function(dir) {

    const filesystem = require("fs");
    const path = require('path');
    let results ={};

    function run(curDir, tree) {
        const files = filesystem.readdirSync(curDir);

        files.forEach(file => {
            const filepath = curDir + '/' + file;
            const stats = filesystem.statSync(filepath);
            const foldername = path.basename(path.dirname(filepath));
            console.log('foldername:', foldername);

            if (stats.isDirectory()) {
                tree[file] = {};
                run(filepath, tree[file]);
            } else {
                tree[file] = null;
                console.log('file:', file, 'path:', path.basename(path.dirname(filepath)));
            }
        });
    }

    run(dir, results);

    return results;
};

module.exports = {
    getAllFilesFromFolder,
};