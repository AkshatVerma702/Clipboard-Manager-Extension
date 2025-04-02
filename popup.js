document.getElementById("search-btn").addEventListener('click', () => {
    const textBar = document.getElementById("text-bar");
    const textBarValue = textBar.value;

    createCard(textBarValue);

    textBar.value = "";
});

document.getElementById("text-bar").addEventListener('keypress', (e) => {
    if(e.key == 'Enter'){
        const textBar = document.getElementById("text-bar");
        const textBarValue = textBar.value;
    
        createCard(textBarValue);
    
        textBar.value = "";
    }
})

function createCard(text){
    if(text == ""){
        return;
    }
    console.log(text);
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

    container.appendChild(cardContainer);
    cardContainer.appendChild(card);
    
    card.appendChild(cardContent);
    card.appendChild(tagContainer);
}