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
var bookmarkDeletePath = serverURL + "bookmark/del/";

// The username and the group name fields
var inputUserNameId = "nameField";
var inputGroupNameId = "groupField";

// The associative key for userName and groupField
var keyUserName = "userName";
var keyGroupName = "userGroup";

// Prefix and Postfix constant
var BOOKMARK_ROW_ID_PRE = "bookmarkRow";
var BOOKMARK_TABLE_ID = "bookMarkTable";
var BOOKMARK_DELETE_LINK_CLASS = "divDelBookmark";
var BOOKMARK_ROW_CLASS = "bookmarkRow";
var BOOKMARK_LINK_CLASS = "bookmarkLink";


// The timeout for loading the credentials from chrome's storage API
var TIMEOUT_LOAD_CREDENTIALS = 10;

// Types of messages
var MESSAGE_TYPE_USER_AND_GROUP_UPDATE = "userAndGroupUpdate";


// Initialises the tasks that happens when the user joins or leaves a group.
handleJoinOrLeaveGroup();
// Activating the message passing listener
mp();

function handleJoinOrLeaveGroup() {
	$("#leaveButton").hide();

	$("#joinButton").click(function() {
        /**
         * The user has just joined a new group.
         * 1) Get the user's group and name.
         * 2) Use messaging API to update the information in the background script.
         * 3) Hide the Join button and show the leave button.
         * 4) Lock the group and name text input fields.
         */
        var userName = document.getElementById(inputUserNameId).value;
		var userGroup = document.getElementById(inputGroupNameId).value;

        // Create a JSON object with the data about the new group to send to the background script.
        var userDetailsJson = {
            type: MESSAGE_TYPE_USER_AND_GROUP_UPDATE,
            userName: userName,
            userGroup: userGroup
        };

        chrome.runtime.sendMessage(userDetailsJson, function(response) { });

        $("#leaveButton").show();
		$("#joinButton").hide();

        // Updating the userGroup and userName on the storage API
        storeCredentials();
        // Loading and parsing JSON data about the bookmarks for this particular group
        parseBookmarksJson(userGroup);

		document.getElementById(inputUserNameId).disabled = true;
		document.getElementById(inputGroupNameId).disabled = true;

	});


	$("#leaveButton").click(function() {
        /**
         * The user has just left a group.
         * 1) Use the messaging API to update the userGroup and userName to empty string.
         * 2) Remove all bookmarks / Create an empty table of bookmarks.
         * 3) Hide the Leave button and show the Join button.
         * 4) Unlock the group and name text input fields.
         */
		var userName = document.getElementById(inputUserNameId).value;
		var userGroup = document.getElementById(inputGroupNameId).value;

        var userDetailsJson = {
            type: MESSAGE_TYPE_USER_AND_GROUP_UPDATE,
            userName: "",
            userGroup: ""
        };

        chrome.runtime.sendMessage(userDetailsJson, function(response) { });

        removeAllBookMarks();

		$("#joinButton").show();
		$("#leaveButton").hide();

		document.getElementById(inputUserNameId).disabled = false;
		document.getElementById(inputGroupNameId).disabled = false;
	});

    // Automatically join a channel if there are stored credentials.
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
				var userName = document.getElementById("nameField").value;
				var userGroup = document.getElementById("groupField").value;

				var responseString = "groupname=" + userGroup + "&username=" + userName;
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
Pusher.logToConsole = true;

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
function newBookMark(id, title, url, name) {
	var tableNode = document.getElementById(BOOKMARK_TABLE_ID);
    var tableBody = tableNode.getElementsByTagName('tbody')[0];

    var row = tableBody.insertRow(0);
    row.classList.add(BOOKMARK_ROW_CLASS);
    row.id = BOOKMARK_ROW_ID_PRE + id;

	var cellNum = row.insertCell(0);
	var cellSender = row.insertCell(1);
	var cellBookmark = row.insertCell(2);
	var cellCPButton = row.insertCell(3);

	cellNum.appendChild(createDeleteBookmarkLink(id));
	cellSender.appendChild(document.createTextNode(name));

	cellBookmark.appendChild(createBookmarkLink(title, url));
    cellBookmark.classList.add(BOOKMARK_LINK_CLASS);

	cellCPButton.innerHTML = "<button class='btn' data-clipboard-target='#foo'><img src='img/clippy.png' style='width:15px;height:15px;' alt='Copy to clipboard'></button>";
}
/**
 * Remove all bookmarks.
 */
function removeAllBookMarks() {
	var tableNode = document.getElementById(BOOKMARK_TABLE_ID);
    var tableBody = tableNode.getElementsByTagName('tbody')[0];

	var numOfRows = tableBody.rows.length;

    while (numOfRows > 1) {
        tableBody.removeChild(tableBody.firstChild);
        numOfRows = tableNode.rows.length;
    }
}

/**
 * Creates a HTML link element given the URL of the bookmark.
 * @param bookmarkUrl: URL of the bookmark
 * @returns {Element}: Link element
 */
function createBookmarkLink(bookmarkTitle, bookmarkUrl) {
    var MAX_URL_LENGTH = 53;
    var shortTitle = bookmarkTitle;
    if (bookmarkTitle.length > MAX_URL_LENGTH) {
        shortTitle = bookmarkTitle.substr(0, MAX_URL_LENGTH) + "...";
    }
    var linkElement = document.createElement("a");
    linkElement.appendChild(document.createTextNode(shortTitle));
    linkElement.title = bookmarkTitle + " - " + bookmarkUrl;
    linkElement.href =  bookmarkUrl;
    linkElement.target = "_blank";

    return linkElement;
}
/**
 * Creates a Div element given the BookmarkID (db) and the title. Returns a div which can be clicked to delete the bookmark
 * @param bookmarkId
 * @param bookmarkTitle
 * @returns {Element}: The div element which will act as the button for deleting the bookmark
 */
function createDeleteBookmarkLink(bookmarkId) {
    if (bookmarkId > 0) {
        var delBookmarkElement = document.createElement("div");
        delBookmarkElement.appendChild(document.createTextNode("X"));
        delBookmarkElement.classList.add(BOOKMARK_DELETE_LINK_CLASS);
        delBookmarkElement.onclick = function() { deleteBookmark(bookmarkId); }

        return delBookmarkElement;
    }
}
function deleteBookmark(bookmarkId) {
    var bookmarkRow = document.getElementById(BOOKMARK_ROW_ID_PRE + bookmarkId);

    var response = loadTextFileAjaxSync(bookmarkDeletePath + bookmarkId, null);
    if (response != null) {
        bookmarkRow.parentNode.removeChild(bookmarkRow);
    }
}

/**
 * Store the Name and the Group of the user's bookmark.
 * Uses chrome's storage.sync API
 * This data will be stored when the user join's a new group
 */
function storeCredentials() {
    credentials = getCredentialsFromInput();

    if (credentials.userName && credentials.userGroup) {
        chrome.storage.sync.set({"userName" : credentials.userName}, function() {
        });
        chrome.storage.sync.set({"userGroup" : credentials.userGroup}, function() {
        });
    } else { }
}
/**
 * Gets the user's Name and the Group's name from the user <input>
 */
function getCredentialsFromInput() {
    var credentials = [];

    credentials.userName = document.getElementById(inputUserNameId).value;
    credentials.userGroup = document.getElementById(inputGroupNameId).value;

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
    });
    chrome.storage.sync.get(keyGroupName, function(userGroup) {
        credentials.userGroup = userGroup.userGroup;
    });

    return credentials;
}

/**
 * Check if a value exists in the local storage for a name and a group. If it does, use those credentials to auto-login
 * when the extension loads up
 */
function autoJoinChannel() {
    var credentials = loadCredentials();

    var userGroup = "";
    var userName = "";

    // Have a short time out function to be able to load the credentials from memory correctly.
    setTimeout(function () {
        userGroup = credentials.userGroup;
        userName = credentials.userName;

        // Sanity check
        if (userGroup != null && userName != null) {
            // Checking they are not empty
            if (userName.length > 0 & userName.length > 0) {
                // There are credentials stored. Update the fields.
                document.getElementById(inputUserNameId).value = userName;
                document.getElementById(inputGroupNameId).value = userGroup;
            }
        }

        // Press the join button
        document.getElementById("joinButton").click();

    }, TIMEOUT_LOAD_CREDENTIALS);
}
/**
 * Loading up JSON data about the Bookmarks from the server.
 */
function parseBookmarksJson(userGroup) {
    // Loading up the JSON data about the bookmarks
    var jsonData = JSON.parse(loadTextFileAjaxSync(serverURL + groupPath + userGroup, "application/json"));

    var bookmarks = [];

    // Iterates through all the bookmarks
    for (var bookmark in jsonData) {
        var title = jsonData[bookmark].title;
        var url = jsonData[bookmark].url;
        var name = jsonData[bookmark].name;
        var id = jsonData[bookmark].id;
        newBookMark(id, title, url, name);
    }
}
