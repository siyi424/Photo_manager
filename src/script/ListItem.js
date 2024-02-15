function listItem(items, container, className) {
    //items includes only names, not the paths
    let result = "<ul id='folders'>";
    items.forEach(item => {
        result += `<li class=${className}>${item}</li>`;
    });
    result += '</ul>';

    //set the inner HTML
    console.log(result);
    container.innerHTML = result;
};

module.exports = {
    listItem
};