function waitForElm(selector) {
    return new Promise(resolve => {
        //bcz ListItem use innerHTML method
        //all elements are loaded at the same time
        //so, we can just check if the first element is loaded
        if (document.querySelector(selector)) {
            return resolve(document.querySelector(selector));
        }

        const observer = new MutationObserver(mutations => {
            if (document.querySelector(selector)) {
                resolve(document.querySelector(selector));
                observer.disconnect();
            }
        });

        observer.observe(document.body, {
            childList: true,
            subtree: true
        });
    });
};

module.exports = {
    waitForElm
}