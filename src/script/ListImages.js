function listImages(items, container) {
    let result = '';
    items.forEach(item => {
        result += `<img src=${item}>`;
    });

    container.innerHTML = result;
        
};

module.exports = {
    listImages
}
