// URL of the backend server
var serverUrl = "http://b7a902cf.ngrok.io/URLShare/sendurl.php?";
//http://b7a902cf.ngrok.io/URLShare/sendurl.php?groupname=brumhack&username=alex&url=http://facebook.com

chrome.contextMenus.create({
    'title': 'Share this URL',
    'contexts': ['all'],
    'onclick': onClickShareLinkHandler
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

function sendGetRequest(path) {
    var xhttp = new XMLHttpRequest();
    xhttp.open("GET", path, true);
    xhttp.send();
}

function onClickShareLinkHandler(info) {
    /**
     *  Code will go here for sending a request to the backend server containing the URL.
     */
    // Sending message to the content script
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        chrome.tabs.sendMessage(tabs[0].id, {getURL: "true"}, function (response) {

            /*
                The URL to be shared has been received. Time to send a request to the database.
             */
            /*var params = {
                "groupname":"brumhack",
                "username":"arghaTest",
                "url":"http://facebook.com"
            };*/
            var newRequestUrl = serverUrl + "groupname=brumhack&username=alexTest&url=http://facebook.com";

            sendGetRequest(newRequestUrl);
            console.log("Response: " + response.currentURL);

        });
    });
}

