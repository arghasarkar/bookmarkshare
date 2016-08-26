/**
 * Created by arghasarkar on 12/03/2016.
 */

// URL of the backend server
var serverUrl = "http://getcouper.com:8000/";
var setBookmarkPath = serverUrl + "bookmark/set/";

// Details about the user's name and group
var userName = "";
var userGroup = "";

// Types of messages
var MESSAGE_TYPE_USER_AND_GROUP_UPDATE = "userAndGroupUpdate";

chrome.contextMenus.create({
    'title': 'Share this URL',
    'contexts': ['all'],
    'onclick': onClickShareUrlHandler
});

function sendRequest(path, params, method) {
    /*
     * Will send a GET / POST request to the backend server.
     */
    method = method || "";

    var form = document.createElement("form");
    form.setAttribute("method", method);
    form.setAttribute("action", path);

    for(var key in params) {
        if(params.hasOwnProperty(key)) {
            var hiddenField = document.createElement("input");
            hiddenField.setAttribute("type", "hidden");
            hiddenField.setAttribute("name", key);
            hiddenField.setAttribute("value", params[key]);

            form.appendChild(hiddenField);
        }
    }

    document.body.appendChild(form);
    form.submit();
}

/**
 * Sends GET request to the server
 * @param serverUrl
 */
function sendGetRequest(serverUrl) {
    var xhttp = new XMLHttpRequest();
    xhttp.open("GET", serverUrl, true);
    xhttp.send();
}

function onClickShareUrlHandler() {
    /**
     *  Code will go here for sending a request to the backend server containing the URL.
     */
    // Sending message to the content script
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {

        chrome.tabs.sendMessage(tabs[0].id, {getURL: "true"}, function (response) {
            var newRequestUrl = setBookmarkPath + "?group=" + userGroup + "&title=" + response.title + "&name=" + userName + "&url=" + response.url;
            sendGetRequest(newRequestUrl);
        });

    });
}

chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
        if (request.type == MESSAGE_TYPE_USER_AND_GROUP_UPDATE) {
            userGroup = request.userGroup;
            userName = request.userName;
        }
    }
);
