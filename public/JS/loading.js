const LOADER = document.getElementById("loading"); // for displayLoading and hideLoading

function displayLoading() {
    LOADER.classList.add("display");
    // document.getElementById("loading-text").innerHTML = "getting the universe...";
}

function hideLoading() {
    LOADER.classList.remove("display");
    document.getElementById("loading-text").innerHTML = '';
}