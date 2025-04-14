console.log("Background.js Loaded");

chrome.runtime.onMessage.addListener((response, sender, sendResponse) => {
    if(response.action == "saveCard"){
        console.log("Card Text: " + response.cardText);
        console.log("Card Tags: " + response.cardTags);

        chrome.storage.local.get({cards : []}, (result) => {
            const cards = result.cards;
            let text = response.cardText;
            let tags = response.cardTags;

            cards.push({
                text,
                tags
            });

            chrome.storage.local.set({cards}, () => {
                console.log("Card Saved!");
                sendResponse({status: "Done!"});
            });
        });

        return true;
    }
    else if(response.action == "sendCard"){
        console.log("Send Card");
        chrome.storage.local.get(["cards"], (result) => {
            console.log("Retrieving Data: ");
            
            console.log("Sending Data Back");
            sendResponse({result});
        });

        return true;
    }
});



