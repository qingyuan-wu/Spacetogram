//main script for index.html

const API_KEY = "jkwwk3jTUN2cesCuLXwxnZUTu2uHYkOetvm5Gdnc";
// PS: email used is qingyuan.bot0@gmail.com

const N = 5; //number of images to get
//get current date as a string in format "yyyy-mm-dd"
const d = new Date();
var m = d.getMonth();
m++; //need to add 1 to get the valid month
var cur_date = `${d.getFullYear()}-${m}-${d.getDate()}`;

// how many days in each month
const DAYS = {
    1: '31',
    2: '28',
    3: '31',
    4: '30',
    5: '31', 
    6: '30',
    7: '31',
    8: '31',
    9: '30',
    10: '31',
    11: '30',
    12: '31',
};

function loadMoreButton(cur_date) {
    // NOTE: ${cur_date} must be in quotes to pass it as a string!
    $('#load-more-container').append(`
        <button class='btn btn-info' id='load-more' onclick='displayImage("${cur_date}", ${N})'>
            Get more Universe
        </button>
    `);
}

const displayImage = async (cur_date, N) => {
    localStorage.clear();
    // first remove any previous "load more" buttons:
    const loadButton = document.getElementById("load-more");
    if (loadButton) {
        loadButton.remove(); //remove load button
    }
    //construct URL for GET request
    var api_url = `https://api.nasa.gov/planetary/apod?api_key=${API_KEY}&date=${cur_date}`;

    for(let i = 0; i < N; i++){
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
            const likeSelector = `#d${cur_date} .heart`;
            const linkURL = `search.html?date=${cur_date}`;
            $('#content-container').append(`
                <div class='image-container' id='d${cur_date}'>
                    <h3 class='image-title'>${json.title}</h3>
                    <section class='image-date'>${json.date}</section>
                    <hr/>
                    <img src=${json.url} alt=${json.title}>
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
        } else if (json.media_type === "video") {
            const url = generateThumbnailURL(json.url);
            if (url) {
                const likeSelector = `#d${cur_date} .heart`;
                const linkURL = `search.html?date=${cur_date}`;
                $('#content-container').append(`
                    <div class='image-container' id='d${cur_date}'>
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
        }
        // get the new day (yesterday)
        var nums = cur_date.split("-");
        var year = parseInt(nums[0]);
        var month = parseInt(nums[1]);
        var day = parseInt(nums[2]);
        if (day === 1) {
            if (month === 1) {
                year--;
                month = 12;
            } else {
                month--;
            }
            day = DAYS[month];
        }
        else {
            day--;
        }
        cur_date = `${year}-${month}-${day}`;

        //update url for the new date: 
        api_url = `https://api.nasa.gov/planetary/apod?api_key=${API_KEY}&date=${cur_date}`;
    }
    //Finished fetching N current posts
    //provide a button to load more posts
    loadMoreButton(cur_date);
}

// prevents linking - but we want it to link, just want to prevent default (Refreshing)!
$('.preventDefault').click(function (e) {
    e.preventDefault();
});

document.onload = displayImage(cur_date, N);
