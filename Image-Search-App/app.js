const formWrapper = document.querySelector(".form-wrapper");
const form = document.querySelector(".form");
const searchInput = document.querySelector(".searchInput");
const searchButton = document.querySelector(".searchButton");
const clearButton = document.querySelector(".clearButton");
const searchResults = document.querySelector(".searchResults");

RunEventListeners();

function RunEventListeners(){
    form.addEventListener("submit", search);
    clearButton.addEventListener("click", clear);
}

function clear(){
    searchInput.value = "";
    Array.from(searchResults.children).forEach((child) => child.remove());
}

function search(e){
    const value = searchInput.value.trim();

    fetch(`https://api.unsplash.com/search/photos?query=${value}`, {
        method: "GET",
        headers: {
            Authorization: "Client-ID vLBiMMYrDzQ9m0Ka-rb7X_gcaXF95N_yuoR9AOWA4Lg"
        }
    })
    .then((response) => response.json())
    .then((data) => {
        Array.from(data.results).forEach((image) => {
            addImageToUI(image.urls.small);
        })
    })
    .catch((error) => console.log(error));

    e.preventDefault();  //stop the page from refreshing when we submit the form
}

function addImageToUI(url){
    const div = document.createElement("div");
    div.className = "card";

    const img = document.createElement("img");
    img.className = "image";
    img.src = url;
    img.height = "300";
    img.width = "400";

    div.appendChild(img);
    searchResults.appendChild(div);
}