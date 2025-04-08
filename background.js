console.log("In background");

let clipboardText;

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    console.log("Background request received: " + request.action);

    if (request.action === "sendItems") {
        console.log("Hi Background");
        console.log("Data sent by content script: " + request.clipboardText);
        clipboardText = request.clipboardText;
        console.log(clipboardText);
    } 
    else if (request.action === "updateUI") {
        console.log("Updating UI...");
        console.log("Data: ", clipboardText);
        sendResponse({ action: "updateUI", data:  clipboardText});
    } 
    else {
        console.log("Unknown action received:", request.action);
    }
});

function saveTags(tagsArray){
    
}
