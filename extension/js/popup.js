/**
 * Created by arghasarkar on 12/03/2016.
 */
// URL of the server
var serverURL = "http://b7a902cf.ngrok.io/URLShare/JSONDecode.php?";

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

/**
 * Using the Pusher API to provide realtime updates
 */
// Enable pusher logging - don't include this in production
//Pusher.logToConsole = true;

var pusher = new Pusher('a7fdcaa3c67e836a3fcc', {
	cluster: 'eu',
	encrypted: true
});

var channel = pusher.subscribe('test_channel');
channel.bind('newurl', function(data) {
	alert(data.message);
	console.log("message");
});

