function listImages(items, container, className) {
    let result = '';
    items.forEach(item => {
        result += `<img src=${item}> alt=${item} class=${className}>`;
    });

    container.innerHTML = result;
        
};

module.exports = {
    listImages
}
