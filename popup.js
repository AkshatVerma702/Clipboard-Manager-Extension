document.getElementById("search-btn").addEventListener('click', () => {
    takeInput();
});

document.getElementById("text-bar").addEventListener('keypress', (e) => {
    if(e.key == 'Enter'){
        takeInput();
    }
});

function takeInput(){
    const textBar = document.getElementById("text-bar");
    const textBarValue = textBar.value;

    let parsedInput = inputParser(textBarValue);
    createCard(parsedInput);

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
        spanClass.style.backgroundColor = getRandomColors();
        tagContainer.appendChild(spanClass);
    }

    container.appendChild(cardContainer);
    cardContainer.appendChild(card);
    
    card.appendChild(cardContent);
    card.appendChild(tagContainer);
}

function inputParser(text){
    //Extract text
    let textFound = "";

    let stringSplit = text.split('::');

    textFound = stringSplit[0];

    let tagsFound = stringSplit[1].split(',');

    //Extract Tags
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
        //Dark background
        fontColor = "white";
    }
    else{
        // Light background
        fontColor = "black";
    }

    return {
        backgroundColorCalc: `rgb(${r}, ${g}, ${b})`,
        calcFontColor: fontColor
    }
} 