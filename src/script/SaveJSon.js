function saveJSon(data, path) {
    const fs = require('fs');
    try {
        const jsonData = JSON.stringify(data, null, 2);
        fs.writeFileSync(path, jsonData);
        console.log('File written to:', path);
    } catch (err) {
        console.error('saveJSON ERROR: ', err);
    };
}

module.exports = { saveJSon };