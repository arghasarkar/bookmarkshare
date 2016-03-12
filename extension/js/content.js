// Runs the Message Passing
setInterval(mp, 1000);

function getCurrentURL() {
    /**
     *  Returns the URL of the page, the user is on.
     */

    return window.location.hostname;
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
    );

}