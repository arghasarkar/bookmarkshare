/**
 * Created by arghasarkar on 12/03/2016.
 */
// URL of the server
var serverURL = "http://getcouper.com:8000/";

// For hiding the button.
hideButton();
// Activating the message passing listener
mp();

function hideButton() {
	$("#leaveButton").hide();
	$("#joinButton").click(function() {

		/*
			Code will go here to send request to the server to join the group share
		 */

		var username = document.getElementById("nameField").value;
		var groupname = document.getElementById("groupField").value;

		// Building the query string
		var queryString = "groupname=" + groupname + "&username=" + username + "&join_status=true";

		var serverResponse = loadTextFileAjaxSync(serverURL + queryString, "text/plain");
		console.log("Resp: " + serverResponse);

		$("#leaveButton").show();
		$("#joinButton").hide();

        // Store the credentials in chrome's local storage
        storeCredentials();

        // Loads the stored credentials
        loadCredentials();

		document.getElementById("nameField").disabled = true;
		document.getElementById("groupField").disabled = true;

	});


	$("#leaveButton").click(function() {

		/*
		 Code will go here to send request to the server to leave the group share
		 */

		var username = document.getElementById("nameField").value;
		var groupname = document.getElementById("groupField").value;

		// Building the query string
		var queryString = "groupname=" + groupname + "&username=" + username + "&join_status=false";

		var serverResponse = loadTextFileAjaxSync(serverURL + queryString, "text/plain");
		console.log("Resp: " + serverResponse);

		$("#joinButton").show();
		$("#leaveButton").hide();
		document.getElementById("nameField").disabled = false;
		document.getElementById("groupField").disabled = false;

	});
}

/*
	Load text with Ajax synchronously: takes path to file and optional MIME type.
	Send a request to the server with the group name and user name
*/
function loadTextFileAjaxSync(filePath, mimeType) {
	var xmlhttp=new XMLHttpRequest();
	xmlhttp.open("GET",filePath,false);
	if (mimeType != null) {
		if (xmlhttp.overrideMimeType) {
			xmlhttp.overrideMimeType(mimeType);
		}
	}
	xmlhttp.send();
	if (xmlhttp.status==200) {
		return xmlhttp.responseText;
	} else {
		// TODO Throw exception
		return null;
	}
}

/**
 * Adding the message passing interface
 */
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

			if (request.getNames) {
				var username = document.getElementById("nameField").value;
				var groupname = document.getElementById("groupField").value;

				var responseString = "groupname=" + groupname + "&username=" + username;
				console.log("GROUP DETAILS: " + responseString);
				sendResponse({nameDetails: responseString});

			}
		}
	);

}

/**
 * Provides the Copy To Clipboard functionality
 */
/*
copyToClipboard();
function copyToClipboard() {

	var clipboard = new Clipboard('.btn');
	clipboard.on('success', function(e) {
		console.log(e);
	});
	clipboard.on('error', function(e) {
		console.log(e);
	});
}
*/

/**
 * Using the Pusher API to provide realtime updates
 */

var pusher = new Pusher('a7fdcaa3c67e836a3fcc', {
	cluster: 'eu',
	encrypted: true
});

var channel = pusher.subscribe('test_channel');
channel.bind('newurl', function(bookMark) {
	// TODO: Code will go here to update the list of new bookMarks
	newBookMark(bookMark.title, bookMark.url, bookMark.name);
});

/**
 * Adding a new bookmark to the extension list
 */
function newBookMark(title, url, name) {
	var table = document.getElementById("bookMarkTable");
	var row = table.insertRow(1);

	var cellNum = row.insertCell(0);
	var cellSender = row.insertCell(1);
	var cellURL = row.insertCell(2);
	var cellCPButton = row.insertCell(3);

	cellNum.innerHTML = "X";
	cellSender.appendChild(document.createTextNode(name));
	cellURL.appendChild(document.createTextNode(url));
	cellCPButton.innerHTML = "<button class='btn' data-clipboard-target='#foo'><img src='img/clippy.png' style='width:15px;height:15px;' alt='Copy to clipboard'></button>";
}

/**
 * Store the Name and the Group of the user's bookmark.
 * Uses chrome's storage.sync API
 * This data will be stored when the user join's a new group
 */
function storeCredentials() {
    var credentials = getCredentialsFromInput();
    var userName = credentials.userName;
    var groupName = credentials.groupName;

    if (userName && groupName) {
        chrome.storage.sync.set({"credentials" : credentials}, function() {
            console.log("The credentials has been saved.\n" + credentials);
        });
    } else {
        console.log("Invalid group or user name");
    }

}
/**
 * Gets the user's Name and the Group's name from the user <input>
 */
function getCredentialsFromInput() {
    var credentials = [];

    credentials.userName = document.getElementById("nameField").value;
    credentials.groupName = document.getElementById("groupField").value;

    return credentials;
}
/**
 * Retrieves the stored credentials from Chrome's storage.
 * Use for persistent data storage.
 */
function loadCredentials() {
    chrome.storage.sync.get("credentials", function(credentials) {
        console.log(credentials);
    });
}
