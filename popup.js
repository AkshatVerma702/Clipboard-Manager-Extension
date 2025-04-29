let allCards = [];

document.addEventListener('DOMContentLoaded', () => {
    console.log("DOM Loaded");
    getAllCards();
});

document.getElementById("add-card-btn").addEventListener('click', () => {
    console.log("Create Card");
    takeInput();
});

document.getElementById("add-card-bar").addEventListener('keypress', (e) => {
    if(e.key == 'Enter'){
        takeInput();
    }
});

document.getElementById("search-bar").addEventListener('focus', () => {
    const itemCardContainer = document.querySelector(".item-card-container");
    if(itemCardContainer){
        console.log("okay")
        itemCardContainer.classList.add('disappear')
    }
});

document.getElementById("search-bar").addEventListener('blur', () => {
    console.log("Out of focus");
    const itemCardContainer = document.querySelector(".item-card-container");
    if(itemCardContainer){
        console.log("okay")
        itemCardContainer.classList.remove('disappear')
    }
})

document.getElementById("search-bar").addEventListener('keypress', (e) => {
    if(e.key == 'Enter'){
        searchFunctionality()
    }
})

document.getElementById("search-btn").addEventListener('click', () => {
    searchFunctionality();
})

// Copy Cards with Click
document.body.addEventListener('click', async (e) => {
    const card = e.target.closest(".item-card");
    if(!card){
        return;
    }

    const targetText = card.querySelector(".item-content")?.textContent.trim();

    if(!targetText){
        return;
    }

    try{
        await navigator.clipboard.writeText(targetText);
        console.log("animation start")
        card.style.animation = "copyAnimation 2s ease";

        card.addEventListener('animationend', function handler() {
            card.style.animation = "";
            card.removeEventListener("animationend", handler);
        })
        console.log("Copied: ", targetText);
    }
    catch(err){
        console.log("Copy Failed: ", err);
    }
});

function searchFunctionality(){
    console.log("User wants to search a card");

    let searchElement = document.getElementById("search-bar").value;

    console.log("In focus: " + document.activeElement);

    console.log(searchElement);
}

function takeInput(){
    const textBar = document.getElementById("add-card-bar");
    const textBarValue = textBar.value;

    let parsedInput = inputParser(textBarValue);

    createCard(parsedInput);

    allCards.push({
        text: parsedInput.userInputText,
        tags: parsedInput.userInputTags
    });

    saveCard(parsedInput);

    textBar.value = "";
    
}

function createCard(parsedInput){
    if(!parsedInput){
        return;
    }

    let text = parsedInput.userInputText;
    let tags = parsedInput.userInputTags;
    
    let container = document.querySelector(".items-container");
    if(!container){
        console.log("main container not found");
        return;
    }
    let cardContainer = document.querySelector(".item-card-container");

    if(!cardContainer){
        console.log("card container not found");
        return;
    }

    let card = document.createElement("div");
    if(!card){
        console.log("card not found");
        return;
    }
    card.classList.add("item-card");
    

    let cardContent = document.createElement("div");
    if(!cardContent){
        console.log("Card content not found");
        return;
    }
    cardContent.classList.add("item-content");
    cardContent.textContent = text;

    let tagContainer = document.createElement("div");
    if(!tagContainer){
        console.log("Tag Container not found");
        return;
    }
    tagContainer.classList.add("tag-container");

    for(const tag of tags){
        let spanClass = document.createElement("span");
        spanClass.textContent = tag;
        spanClass.classList.add("tag");
        let colorObject = getRandomColors();
        spanClass.style.backgroundColor = colorObject.backgroundColorCalc;
        spanClass.style.color = colorObject.calcFontColor;
        tagContainer.appendChild(spanClass);
    }

    container.appendChild(cardContainer);
    cardContainer.appendChild(card);
    
    card.appendChild(cardContent);
    card.appendChild(tagContainer);
}

function inputParser(text){
    let textFound = "";

    let stringSplit = text.split('::');

    textFound = stringSplit[0];

    if(textFound == ""){

    }

    let tagsFound = stringSplit[1].split(',');

    return {
        userInputText: textFound,
        userInputTags: tagsFound
    }
}

function getRandomColors(){
    let r = Math.floor(Math.random() * 255) + 1;
    let g = Math.floor(Math.random() * 255) + 1;
    let b = Math.floor(Math.random() * 255) + 1;

    const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
    const tippingPoint = 0.6;

    let fontColor = "";

    if(luminance < tippingPoint){
        fontColor = "white";
    }
    else{
        fontColor = "black";
    }

    return {
        backgroundColorCalc: `rgb(${r}, ${g}, ${b})`,
        calcFontColor: fontColor
    }
} 


function saveCard(parsedInput){
    chrome.runtime.sendMessage({action: "saveCard", cardText: parsedInput.userInputText, cardTags: parsedInput.userInputTags}, (response) => {
        console.log(response);
        console.log("Response from content Script: ", response.status);
    });
}

function getAllCards(){
    console.log("Getting All cards");

    chrome.runtime.sendMessage({action: "sendCard"}, (response) => {
        console.log(response);

        for(const card of response.result.cards){
            let tags = card.tags;
            let text = card.text;

            if(!tags){
                continue;
            }

            createCard({
                userInputText: text,
                userInputTags: tags
            });
        }
    })
};
