const API_KEY = "jkwwk3jTUN2cesCuLXwxnZUTu2uHYkOetvm5Gdnc";
const resultsList = document.getElementById('picture-container');
function checkDateValid(date) {
    if (date < "1995-06-20") {
        return false; //too early!
    }
    const d = new Date();
    var m = d.getMonth();
    m++; //need to add 1 to get the valid month
    const cur_date = `${d.getFullYear()}-${m}-${d.getDate()}`;
    console.log(cur_date);
    const nums = cur_date.split("-");
    
    const cur_year = parseInt(nums[0]);
    const cur_month = parseInt(nums[1]);
    const cur_day = parseInt(nums[2]);

    const nums2 = date.split("-");
    const input_year = parseInt(nums2[0]);
    const input_month = parseInt(nums2[1]);
    const input_day = parseInt(nums2[2]);
    if (input_year > cur_year) {
        return false;
    } if (input_year === cur_year && input_month > cur_month) {
        return false;
    } if (input_year === cur_year && input_month === cur_month && input_day > cur_day) {
        return false;
    }
    return true;
}
const postImage = async (date) => {
    const valid = checkDateValid(date); //make sure date is valid
    if (!valid) {
        alert("Please enter a valid date!");
        return false;
    }
    //construct URL for GET request
    var api_url = `https://api.nasa.gov/planetary/apod?api_key=${API_KEY}&date=${date}`;
    displayLoading();

    // make an image container containing the title, image, and description
    const json = await fetch(api_url, {
        method: "GET",
        headers: {"Content-type": "application/json;charset=UTF-8"}
    })
    .then(response => response.json())
    hideLoading();
    if (json.media_type === "image") {            
        // must put a space for selector!
        const likeSelector = `#d${date} .heart`;
        const linkURL = `search.html?date=${date}`;
        $('#picture-container').append(`


            <div class='image-container' id='d${date}'>
            <h3 class='image-title'>${json.title}</h3>
            <section class='image-date'>${json.date}</section>
            
            <img src=${json.url} alt=${json.title}>
            
            <div class="like-container like-button" onclick="like('${likeSelector}', '${json}')">
                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" class="bi bi-heart heart" viewBox="-1 -2 18 18">
                    <path d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314z"/>
                </svg>
            </div>
            <a class="like-container" id="link" href=${linkURL}>
                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" class="bi bi-link-45deg" viewBox="0 0 16 16">
<path d="M4.715 6.542 3.343 7.914a3 3 0 1 0 4.243 4.243l1.828-1.829A3 3 0 0 0 8.586 5.5L8 6.086a1.002 1.002 0 0 0-.154.199 2 2 0 0 1 .861 3.337L6.88 11.45a2 2 0 1 1-2.83-2.83l.793-.792a4.018 4.018 0 0 1-.128-1.287z"/>
<path d="M6.586 4.672A3 3 0 0 0 7.414 9.5l.775-.776a2 2 0 0 1-.896-3.346L9.12 3.55a2 2 0 1 1 2.83 2.83l-.793.792c.112.42.155.855.128 1.287l1.372-1.372a3 3 0 1 0-4.243-4.243L6.586 4.672z"/>
                </svg>
            </a>
            <p class='image-description'>${json.explanation}</p>
        </div>
        `);
    } else if (json.media_type === "video"){ //not an image, a video
        const url = generateThumbnailURL(json.url);
        if (url) {
            const likeSelector = `#d${date} .heart`;
            const linkURL = `search.html?date=${date}`;
            $('#picture-container').append(`
                <div class='image-container' id='d${date}'>
                <h3 class='image-title'>${json.title}</h3>
                <section class='image-date'>${json.date}</section>
                <hr/>
                <img src=${url} alt=${json.title}>
                <hr/>
                <div class="like-container like-button" onclick="like('${likeSelector}', '${json}')">
                    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" class="bi bi-heart heart" viewBox="-1 -2 18 18">
                        <path d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314z"/>
                    </svg>
                </div>
                <a class="like-container" id="link" href=${linkURL}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" class="bi bi-link-45deg" viewBox="0 0 16 16">
<path d="M4.715 6.542 3.343 7.914a3 3 0 1 0 4.243 4.243l1.828-1.829A3 3 0 0 0 8.586 5.5L8 6.086a1.002 1.002 0 0 0-.154.199 2 2 0 0 1 .861 3.337L6.88 11.45a2 2 0 1 1-2.83-2.83l.793-.792a4.018 4.018 0 0 1-.128-1.287z"/>
<path d="M6.586 4.672A3 3 0 0 0 7.414 9.5l.775-.776a2 2 0 0 1-.896-3.346L9.12 3.55a2 2 0 1 1 2.83 2.83l-.793.792c.112.42.155.855.128 1.287l1.372-1.372a3 3 0 1 0-4.243-4.243L6.586 4.672z"/>
                    </svg>
                </a>
                <p class='image-description'>${json.explanation}</p>
            </div>
            `);
        }
    } else {
        $('#picture-container').append(`
        <div class='image-container' id='d${date}'>
            <h2 class='image-title'>${json.title}</h2>
            <h3 class='image-date'>${json.date}</h3>
            <div>Sorry, cannot display :/ The media type is unsupported. Please try another search.</div>
        </div>
    `);
    }
    return true;
}

new URLSearchParams(window.location.search).forEach((value) => {
    postImage(value);
});
