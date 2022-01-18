// given YouTube URL, parse to get the id
function youtubeParser(videoURL){
    var regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
    var match = videoURL.match(regExp);
    return (match&&match[7].length==11)? match[7] : false;
}

//then generate thumbnail
function generateThumbnailURL(videoURL) {
    const id = youtubeParser(videoURL);
    if (id) {
        return `https://img.youtube.com/vi/${id}/0.jpg`;
    }
    return false;
}