/**
 * Created by arghasarkar on 12/03/2016.
 */

// URL of the server
var serverUrl = "http://getcouper.com:8000/api/";
var setBookmarkPath = serverUrl + "bookmark/set/";

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
        1) Would listen for a request to send a link and title.
        2) Would reply to the current URL of the page the user is on.
     */

    chrome.runtime.onMessage.addListener(
        /*
        Work will be down here.
         */
        function(request, sender, sendResponse) {

            if (request.getURL) {
                var urlJson = {
                    url: getCurrentURL(),
                    title: document.title
                };

                sendResponse(urlJson);
            }
        }
    );
}
