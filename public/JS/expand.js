// image description is collapsed by default, clicking expands it.
const expand = (selector) => {
    //expand button div
    const elem = document.querySelector(selector);
    if (elem) {
        elem.classList.toggle("expanding");
    }
    //image description div
    const pElemSelector = `${selector.split(" ")[0]} .image-description`;
    const pElem = document.querySelector(pElemSelector);
    if (pElem) {
        pElem.classList.toggle("expanding");
    }
};
