// URL of the backend server
var serverUrl = "http://5600b1a2.ngrok.io";

chrome.contextMenus.create({
    'title': 'Share this URL',
    'contexts': ['all'],
    'onclick': onClickShareLinkHandler
});

function onClickShareLinkHandler(info) {
    /**
     *  Code will go here for sending a request to the backend server containing the URL.
     */
}

