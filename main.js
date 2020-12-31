
refreshCartNumber();

var cart = document.getElementById("cart");

function printf(value) { console.log(value); }

async function getMemes() {
    let response = await fetch("https://api.memegen.link/images");
    let data = await response.json();
    return data;
}

function addToDatabase(meme) {
    // this function add the meme to browser indexedDB
    if (typeof (Storage) !== "undefined") {
        const date = new Date();
        localStorage.setItem(meme.url, meme.url);
        refreshCartNumber();
        // localStorage.setItem(meme.url, date.getTime());
    } else {
        printf("web storage not available");
    }
}

function getMemesLength() {
    // this function gets saved memes number
    if (typeof (Storage) !== "undefined") {
        return localStorage.length;
    }
    return 0;
}

function refreshCartNumber() {
    // this function refreshes the cart items number
    if (typeof (Storage) !== "undefined") {
        // Code for localStorage/sessionStorage.
        const nbr = getMemesLength();
        let cart = document.getElementById("cart");
        cart.innerHTML = nbr;
    }
}

function getFromDatabase() {
    // this function gets the list of memes from indexedDB
    const l = getMemesLength();
    let memes = [];
    if (typeof(Storage) !== "undefined") {
        for(let i=0; i<l; i++){
            let k = localStorage.key(i);
            memes[i] = localStorage.getItem(k);
        }
    }
    printf(memes);
}

function removeFromDatabase(meme) {
    // this function remove this meme from indexedDB
    if (typeof(Storage) !=="undefined"){
        localStorage.removeItem(meme);
        refreshCartNumber();
    }
}

function removeAllFromDatabase() {
    // this function removes all the memes from indexedDB
    if(typeof(Storage) !== "undefined"){
        localStorage.clear();
    }
}

getMemes().then(value => {
    // printf(value);
    var body = document.getElementById("body");
    body.innerHTML = "";
    value.forEach((element, index) => {
        if (index % 4 == 0) {
            body = document.getElementById('body');
            let child = document.createElement('div');
            child.className = "row";
            body.appendChild(child);
            body = body.children[index / 4];
        }
        let child = document.createElement('div');
        child.className = "meme-card-placeholder";
        let meme = document.createElement('img');
        meme.src = element.url;
        meme.className = "meme-card";
        meme.onclick = () => addToDatabase(element);
        child.appendChild(meme);
        body.appendChild(child);
    });
});