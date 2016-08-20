/**
 * Created by arghasarkar on 12/03/2016.
 */

/**
 *
 * Global variables and constants are stored here.
 */
// URL of the server
var serverURL = "http://getcouper.com:8000/";
var groupPath = "group/join/";
// The username and the group name fields
var inputUserNameId = "nameField";
var inputGroupNameId = "groupField";
// The associative key for userName and groupField
var keyUserName = "userName";
var keyGroupName = "groupName";
// The timeout for loading the credentials from chrome's storage API
var TIMEOUT_LOAD_CREDENTIALS = 10;

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
        var userName = document.getElementById(inputUserNameId).value;
		var groupName = document.getElementById(inputGroupNameId).value;

		$("#leaveButton").show();
		$("#joinButton").hide();

        // Updating the credentials
        storeCredentials();
        // Loading and parsing JSON data
        parseBookmarksJson(groupName);

		document.getElementById(inputUserNameId).disabled = true;
		document.getElementById(inputGroupNameId).disabled = true;

	});


	$("#leaveButton").click(function() {

		/*
		 Deletes all the bookmarks, enables the name and channel input field and activates the Join button
		 */

		var username = document.getElementById(inputUserNameId).value;
		var groupname = document.getElementById(inputGroupNameId).value;

		removeAllBookMarks();

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
	var xmlhttp = new XMLHttpRequest();
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
	newBookMark(bookMark.title, bookMark.url, bookMark.name);
});

/**
 * Adding a new bookmark to the extension list
 */
function newBookMark(title, url, name) {
	var tableNode = document.getElementById("bookMarkTable");
    var tableBody = tableNode.getElementsByTagName('tbody')[0];

    var row = tableBody.insertRow(0);

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
 * Remove all bookmarks.
 */
function removeAllBookMarks() {
	var tableNode = document.getElementById("bookMarkTable");
    var tableBody = tableNode.getElementsByTagName('tbody')[0];

	/*while (tableNode.firstChild) {
		tableNode.removeChild(tableNode.firstChild);
	}*/

	var numOfRows = tableBody.rows.length;

	/*var rowCount = 0;
	for (rowCount = 1; rowCount < numOfRows; rowCount++) {
		tableNode.deleteRow(rowCount);
	}*/

    while (numOfRows > 1) {
        tableBody.removeChild(tableBody.firstChild);
        numOfRows = tableNode.rows.length;
    }
}

/**
 * Store the Name and the Group of the user's bookmark.
 * Uses chrome's storage.sync API
 * This data will be stored when the user join's a new group
 */
function storeCredentials() {
    credentials = getCredentialsFromInput();
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

    var groupName = "";
    var userName = "";

    // Have a short time out function to be able to load the credentials from memory correctly.
    setTimeout(function () {
        groupName = credentials.groupName;
        userName = credentials.userName;

        // Sanity check
        if (groupName != null && userName != null) {
            // Checking they are not empty
            if (userName.length > 0 & userName.length > 0) {
                // There are credentials stored. Update the fields.
                document.getElementById(inputUserNameId).value = userName;
                document.getElementById(inputGroupNameId).value = groupName;
            }
        }

        // Press the join button
        document.getElementById("joinButton").click();

    }, TIMEOUT_LOAD_CREDENTIALS);
}
/**
 * Loading up JSON data about the Bookmarks from the server.
 */
function parseBookmarksJson(groupName) {
    // Loading up the JSON data about the bookmarks
    var jsonData = JSON.parse(loadTextFileAjaxSync(serverURL + groupPath + groupName, "application/json"));
    //console.log("Data" + jsonData);

    var bookmarks = [];

    // Iterates through all the bookmarks
    for (var bookmark in jsonData) {
        console.log(bookmark);
        var title = jsonData[bookmark].title;
        var url = jsonData[bookmark].url;
        var name = jsonData[bookmark].name;
        newBookMark(title, url, name);
    }

}
