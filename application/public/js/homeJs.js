
function fadeOut(theDiv){
    let mainDiv = document.getElementById('viewpost-container');
    var interval = setInterval(changeOpacity, 20);
    function changeOpacity() {
        let opacity = theDiv.style.opacity;
        if( opacity > 0 ) {
            opacity -= 0.1;
            theDiv.style.opacity = opacity;
        }
        if( opacity == 0 )
        {
            mainDiv.removeChild(theDiv);
            clearInterval(interval);
            regex = /\d/g;
            theEle = document.getElementById('numItems');
            numItems = theEle.innerHTML;
            numElements = numItems.match(regex);
            numElements = numElements.join("");
            console.log(numElements);
            numElements -= 1;
            console.log(numElements);
            theEle.innerHTML = `There are ${numElements} photo(s) being shown`;
        }
    }
}

function createPhotoCard(data, containerDiv) {
    let miniGrid = document.createElement("div");
    miniGrid.className = "miniGrid"
    miniGrid.id = data["id"];
    miniGrid.style.opacity = 1;
    miniGrid.setAttribute( "onClick", "fadeOut(this)");
    let image = document.createElement("img");
    image.src = data["url"];
    let title = document.createElement("h1");
    title.innerHTML = data["title"];
    miniGrid.appendChild(image);
    miniGrid.appendChild(title);
    containerDiv.appendChild(miniGrid);
}

let mainDiv = document.getElementById('viewpost-container');

if(mainDiv) {
    let fetchUrl = "https://jsonplaceholder.typicode.com/albums/2/photos"
    fetch(fetchUrl)
    .then((data) => data.json() )
    .then((photos) => {
        let innerHtml = "";
        photos.forEach((photo) => {
            createPhotoCard(photo, mainDiv);
        });
        numItems = document.getElementById('numItems');
        numItems.innerHTML = `There are ${photos.length} photo(s) being shown`;
    })
}

function setFlashMessageFadeOut() {
    setTimeout(() => {
        let currentOpacity = 1.0;
        let timer = setInterval(() => {
            if(currentOpacity < 0.05) {
                clearInterval(timer);
                flashElement.remove();
            }
            currentOpacity = currentOpacity - .05;
            flashElement.style.opacity = currentOpacity;
        }, 50);
    },4000);
}

let flashElement = document.getElementById('flash-message');
if(flashElement){
    setFlashMessageFadeOut();
}
