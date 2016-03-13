/**
 * Created by arghasarkar on 12/03/2016.
 */
// URL of the server
var serverURL = "http://027bfe49.ngrok.io/URLShare/JSONDecode.php?";

// For hiding the button.
hideButton();

function hideButton() {
	// Hides the button on load
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



