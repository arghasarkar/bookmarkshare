// URL of the backend server
var serverUrl = "http://getcouper.com:8000/";
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
                CODE WILL GO HERE TO GET THE GROUP NAME AND THE USER NAME
             */
            var queryString = "";
            chrome.extension.sendMessage({getNames: "true"}, function (responseString) {
                queryString = responseString;
            });
            /*
             The DETAILS has been received. Time to send a request to the database.
             */
            var newRequestUrl = serverUrl + "groupname=brumhack&username=alexTest&url=http://facebook.com";
            //var newRequestUrl = serverUrl + queryString;
            console.log("ResponseQ: " + newRequestUrl);
            sendGetRequest(newRequestUrl);


        });
    });
}

