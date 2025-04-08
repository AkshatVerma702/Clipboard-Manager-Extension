console.log("Content Script Says Hi!");

chrome.runtime.onMessage.addListener((response, sender, sendResponse) => {
    if(response.action == "saveCard"){
        console.log("Card Text: " + response.cardText);
        console.log("Card Tags: " + response.cardTags);

        chrome.storage.local.set({text: response.cardText, tags: response.cardTags}, () => {
            console.log("Card Saved!");
        });

        sendResponse({status: "Done!"});

        return true;
    }
    else if(response.action == "sendCard"){
        console.log("Send Card");
        chrome.storage.local.get(["text", "tags"], (result) => {
            console.log("Retrieving Data: ");

            console.log("Card Text Received: ", result.text);
            console.log("Card Tags Received: ", result.tags);
            
            console.log("Sending Data Back");
            sendResponse({text: result.text, tags: result.tags});
        });

        return true;
    }
});



