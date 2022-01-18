//put all liked posts onto DOM
const displayLikedImages = () => {
    for (const elem of Object.values(localStorage)) {
        $('#liked-posts-container').append(elem);
    }
};

document.onload = displayLikedImages();
