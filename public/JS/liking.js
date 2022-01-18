// control the "like" feature, both for standard clicking and dblclick
const like = (selector, json) => {
    let container = selector.slice(0, -6);

    //get rid of spaces, if any
    container = container.replaceAll(' ', '');

    // store liked container content to localStorage to be accessed in likedPosts.js
    // we must surround the content with the div with class so our css in styles.css works properly!
    if (document.querySelector(container)) {
      const content = `<div class='image-container'>${document.querySelector(container).innerHTML}</div>`;
      localStorage[selector] = content;
      var element = document.querySelector(selector);
      element.classList.toggle("liked");
    } else {
      console.log("You liked this post already");
    }
};