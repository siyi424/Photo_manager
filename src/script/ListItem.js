function listItem(items, container, className) {
    //items includes only names, not the paths
    let result = "<div id='folders'>";
    items.forEach(item => {
        svg = '<svg t="1710322749934" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="12922" width="20" height="20"><path d="M384 768 640 512 384 256Z" p-id="12923" fill="#707070"></path></svg>'
        result += `<div class="div-lists">${svg}<span class=${className}>${item}</span></div>`;
    });
    result += '</div>';

    //set the inner HTML
    console.log(result);
    container.innerHTML = result;
};

module.exports = {
    listItem
};