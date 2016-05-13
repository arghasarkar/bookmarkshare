/**
 * Created by arghasarkar on 12/03/2016.
 */

/**
 *
 * Global variables and constants are stored here.
 */
// URL of the server
var serverURL = "http://getcouper.com:8000/";
// The username and the group name fields
var inputUserNameId = "nameField";
var inputGroupNameId = "groupField";
// The associative key for userName and groupField
var keyUserName = "userName";
var keyGroupName = "groupName";
// The timeout for loading the credentials from chrome's storage API
var TIMEOUT_LOAD_CREDENTIALS = 100;

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

		var username = document.getElementById(inputUserNameId).value;
		var groupname = document.getElementById(inputGroupNameId).value;

		// Building the query string
		var queryString = "groupname=" + groupname + "&username=" + username + "&join_status=true";

		var serverResponse = loadTextFileAjaxSync(serverURL + queryString, "text/plain");
		console.log("Resp: " + serverResponse);

		$("#leaveButton").show();
		$("#joinButton").hide();

        // Updating the credentials
        storeCredentials();

		document.getElementById(inputUserNameId).disabled = true;
		document.getElementById(inputGroupNameId).disabled = true;

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
		document.getElementById(inputUserNameId).disabled = false;
		document.getElementById(inputGroupNameId).disabled = false;

	});

    // Checking if a value has been set already.
    autoJoinChannel();
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
    console.log(credentials.groupName + " - " + credentials.userName);

    if (credentials.userName && credentials.groupName) {
        chrome.storage.sync.set({"userName" : credentials.userName}, function() {
            console.log("The username has been saved.\n" + credentials.userName);
        });
        chrome.storage.sync.set({"groupName" : credentials.groupName}, function() {
            console.log("The groupname has been saved. \n" + credentials.groupName);
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

    credentials.userName = document.getElementById(inputUserNameId).value;
    credentials.groupName = document.getElementById(inputGroupNameId).value;

    return credentials;
}
/**
 * Retrieves the stored credentials from Chrome's storage.
 * Use for persistent data storage.
 */
function loadCredentials() {
    var credentials = [];
    chrome.storage.sync.get(keyUserName, function(userName) {
        credentials.userName = userName.userName;
        //console.log(credentials[keyUserName]);
    });
    chrome.storage.sync.get(keyGroupName, function(groupName) {
        credentials.groupName = groupName.groupName;
        //console.log(groupName.groupName)
    });

    return credentials;
}

/**
 * Check if a value exists in the local storage for a name and a group. If it does, use those credentials to auto-login
 * when the extension loads up
 */
function autoJoinChannel() {
    var credentials = loadCredentials();

    // Have a short time out function to be able to load the credentials from memory correctly.
    setTimeout(function () {
        var groupName = credentials.groupName;
        var userName = credentials.userName;

        // Sanity check
        if (groupName != null && userName != null) {
            // Checking they are not empty
            if (userName.length > 0 & userName.length > 0) {
                // There are credentials stored. Update the fields.
                document.getElementById(inputUserNameId).value = userName;
                document.getElementById(inputGroupNameId).value = groupName;
            }
        }

    }, TIMEOUT_LOAD_CREDENTIALS);
    document.getElementById("joinButton").click();
}
