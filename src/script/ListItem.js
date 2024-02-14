function listItem(items, container, className) {
    //items includes only names, not the paths
    let result = '';
    items.forEach(item => {
        result += `<li class=${className}>${item}</li>`;
    });

    //set the inner HTML
    console.log(result);
    container.innerHTML = result;
};

module.exports = {
    listItem
};