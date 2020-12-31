refreshCartNumber();

var cart = document.getElementById("cart");

function printf(value) { console.log(value); }

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
    if (typeof (Storage) !== "undefined") {
        for (let i = 0; i < l; i++) {
            let k = localStorage.key(i);
            memes[i] = localStorage.getItem(k);
        }
    }
    return memes;
}

function removeFromDatabase(meme) {
    // this function remove this meme from indexedDB
    if (typeof (Storage) !== "undefined") {
        localStorage.removeItem(meme);
        refreshCartNumber();
    }
}

function removeAllFromDatabase() {
    // this function removes all the memes from indexedDB
    if (typeof (Storage) !== "undefined") {
        localStorage.clear();
    }
}



localMemesBody();

function localMemesBody() {
    let localMemes = getFromDatabase();
    var body = document.getElementById("body");
    body.innerHTML = "";
    if (localMemes.length > 0) {
        localMemes.forEach((value, index, arr) => {
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
            meme.src = value;
            meme.className = "meme-card";
            meme.onclick = () => {
                open(value);
            };
            meme.addEventListener("auxclick", (ev) => {
                if (ev.button === 1) {
                    removeFromDatabase(value);
                    localMemesBody();
                }
            });
            child.appendChild(meme);
            body.appendChild(child);
        });
    } else {
        let div = document.createElement("div");
        div.className = "vertical-center horizontal-center";
        let h1 = document.createElement("h1");
        h1.textContent = "No Memes available for the moment.";
        div.appendChild(h1);
        body.appendChild(div);
    }
}