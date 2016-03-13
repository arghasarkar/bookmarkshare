/**
 * Created by arghasarkar on 12/03/2016.
 */
hideButton();
function hideButton() {
	document.getElementById("foo").disabled = true;
	$("#leaveButton").hide();
	$("#joinButton").click(function() {
	$("#leaveButton").show();
	$("#joinButton").hide();
	document.getElementById("nameField").disabled = true;
	document.getElementById("groupField").disabled = true;

});
$("#leaveButton").click(function() {
	$("#joinButton").show();
	$("#leaveButton").hide();
	document.getElementById("nameField").disabled = false;
	document.getElementById("groupField").disabled = false;

});
}

