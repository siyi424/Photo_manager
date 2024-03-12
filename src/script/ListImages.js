function listImages(items, container) {

    let result = '';
    items.forEach(item => {
        result += `<img src=${item} width=300px height=300px>`;
    });

    container.innerHTML = result;
        
};

module.exports = {
    listImages
}
