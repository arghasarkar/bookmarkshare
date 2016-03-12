<!DOCTYPE html>
<html lang="en">
  <head>
  	<script src="js/popup.js"></script>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <!-- The above 3 meta tags *must* come first in the head; any other head content must come *after* these tags -->
    <title>URL Share</title>

    <!-- Bootstrap -->
    <link href="css/popup.css" rel="stylesheet">
    <link href="css/bootstrap.min.css" rel="stylesheet">

    <!-- HTML5 shim and Respond.js for IE8 support of HTML5 elements and media queries -->
    <!-- WARNING: Respond.js doesn't work if you view the page via file:// -->
    <!--[if lt IE 9]>
      <script src="https://oss.maxcdn.com/html5shiv/3.7.2/html5shiv.min.js"></script>
      <script src="https://oss.maxcdn.com/respond/1.4.2/respond.min.js"></script>
    <![endif]-->
  </head>
  <body>

	<div class="row">
	  <div class="col-xs-6"><img src="img/logo-64.png" alt="Logo" style="width:100px;height:100px;"></div>
	  <div class="col-xs-6"><h1>URL Share</h1></div>
	</div>
	</div>

	<form role="form" action ="#" method="post">
		<div class="input-group input-group-sm" id="input-name">
		  <span class="input-group-addon" id="sizing-addon3">User:</span>
		  <input id="nameField" type="text" class="form-control" placeholder="Insert your name here" aria-describedby="sizing-addon3">
		</div>
		<div class="input-group input-group-sm" id="input-name">
		  <span class="input-group-addon" id="sizing-addon3">Group:</span>
		  <input id="groupField" type="text" class="form-control" placeholder="Insert the group name here" aria-describedby="sizing-addon3">
		</div>
		<div class="row">
		  <div class="col-xs-6"><h3>Group: <span class="label label-default"></span></h3></div>
		  <div class="col-xs-6"><button id="joinButton" type="button" class="btn btn-info">Join</button><button id="leaveButton" type="button" class="btn btn-primary">Leave</button></div>
		  <!---->

		</div>
	</form>

	<table class="table table-striped">
	  <tr>
	    <td>#</td>
	    <td>Sender</td>
	    <td>URL</td>
	    <td>Action</td>
	  </tr>
	  <tr>
	    <td>1.</td>
	    <td>Jackson</td>
	    <td>http://www.google.csom</td>
	    <td><button type="button" class="btn btn-success">Visit</button></td>
	  </tr>
	  <tr>
	    <td>1.</td>
	    <td>Jackson</td>
	    <td>http://www.google.com</td>
	    <td><button type="button" class="btn btn-success">Visit</button></td>
	  </tr>
	</table>

	
    <!-- jQuery (necessary for Bootstrap's JavaScript plugins) -->
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/1.11.3/jquery.min.js"></script>
    <!-- Include all compiled plugins (below), or include individual files as needed -->
    <script src="js/bootstrap.min.js"></script>
  </body>
</html>