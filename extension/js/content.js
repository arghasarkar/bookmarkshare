// Runs the Message Passing
mp();

function getCurrentURL() {
    /**
     *  Returns the URL of the page, the user is on.
     */

    return window.location.href;
}

function mp() {
    /*
        1) Would listen for a request to send a link.
        2) Would reply to the current URL of the page the user is on.
     */

    chrome.runtime.onMessage.addListener(
        /*
        Work will be down here. 
         */
        function(request, sender, sendResponse) {

            if (request.getURL) {
                var currentURL = getCurrentURL();
                console.log("URL: " + currentURL);
                sendResponse({currentURL: currentURL});
            }
        }
    );

}