 <!DOCTYPE html>
<html lang="en">
<?php
  $username = $_POST["username"];

      require_once('config.inc.php');
  $connection = mysqli_connect($database_host, $database_user, $database_pass, $database_name);
  if($connection -> connect_error) {
    die('Connect Error ' . $connection -> connect_errno . ' ' . $connection -> connect_error);
  } // if
  
      $query = "SELECT Username FROM users 
              WHERE Username = '$username'";
    $queryResult = mysqli_query($connection, $query);
    $rowArray = mysqli_fetch_array($queryResult);
    
    
    if(!empty($rowArray)) {
      mysqli_close($connection);  
      header('Location: wronginput.html');
    }
?>



<head>

    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="description" content="">
    <meta name="author" content="">

    <title>ShareURL - Account Info</title>

    <!-- Bootstrap Core CSS -->
    <link rel="stylesheet" href="cssBook/bootstrap.min.css" type="text/css">

    <!-- Custom Fonts -->
    <link href='http://fonts.googleapis.com/css?family=Open+Sans:300italic,400italic,600italic,700italic,800italic,400,300,600,700,800' rel='stylesheet' type='text/css'>
    <link href='http://fonts.googleapis.com/css?family=Merriweather:400,300,300italic,400italic,700,700italic,900,900italic' rel='stylesheet' type='text/css'>
    <link rel="stylesheet" href="font-awesome/css/font-awesome.min.css" type="text/css">

    <!-- Plugin CSS -->
    <link rel="stylesheet" href="cssBook/animate.min.css" type="text/css">

    <!-- Custom CSS -->
    <link rel="stylesheet" href="cssBook/creative.css" type="text/css">

    <!-- HTML5 Shim and Respond.js IE8 support of HTML5 elements and media queries -->
    <!-- WARNING: Respond.js doesn't work if you view the page via file:// -->
    <!--[if lt IE 9]>
        <script src="https://oss.maxcdn.com/libs/html5shiv/3.7.0/html5shiv.js"></script>
        <script src="https://oss.maxcdn.com/libs/respond.js/1.4.2/respond.min.js"></script>
    <![endif]-->

</head>

<body id="page-top">

    <nav id="mainNav" class="navbar navbar-default navbar-fixed-top">
        <div class="container-fluid">
            <!-- Brand and toggle get grouped for better mobile display -->
            <div class="navbar-header">
                <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1">
                    <span class="sr-only">Toggle navigation</span>
                    <span class="icon-bar"></span>
                    <span class="icon-bar"></span>
                    <span class="icon-bar"></span>
                </button>
                <a class="navbar-brand page-scroll" href="#page-top">Home</a>
            </div>

            <!-- Collect the nav links, forms, and other content for toggling -->
            <div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
                <ul class="nav navbar-nav navbar-right">
                    <li>
                        <a class="page-scroll" href="#currentgrp">Current groups</a>
                    </li>
                    <li>
                        <a class="page-scroll" href="#previousgrp">Previous groups</a>
                    </li>  
                    <li>
                        <a class="index.html" href="index.html">Log out</a>
                    </li>                                        
                    <li>
                        <a class="page-scroll" href="#contact">Contact Us</a>
                    </li>					
                </ul>
            </div>
            <!-- /.navbar-collapse -->
        </div>
        <!-- /.container-fluid -->
    </nav>

    <header>
        <div class="header-content">
            <div class="header-content-inner">
                <h1>Welcome to your account <?php echo $_POST["username"]; ?> </h1>
                <hr>
                <p>Press the button to view your groups</p>
                <a href="#currentgrp" class="btn btn-primary btn-xl page-scroll">Current Groups</a>
            </div>
        </div>
    </header>

    <section class="bg-primary" id="currentgrp">
        <div class="container">
            <div class="row">
                <div class="col-lg-8 col-lg-offset-2 text-center">
                    <h2 class="section-heading">Your current groups at the moment are:</h2>
                    <hr class="light">
                    <p class="text-faded">
<?php
  $username = $_POST["username"];
  $group_name = $_POST["group_name"] ;

    require_once('config.inc.php');
  $connection = mysqli_connect($database_host, $database_user, $database_pass, $database_name);
  if($connection -> connect_error) {
    die('Connect Error ' . $connection -> connect_errno . ' ' . $connection -> connect_error);
  } // if
  
  // Check if there is another group with the same name.
    $query = "SELECT GroupName FROM groups 
              WHERE GroupName = '$group_name'";
    $queryResult = mysqli_query($connection, $query);
    $rowArray = mysqli_fetch_array($queryResult);

    // If not, insert in both tables.
    if(empty($rowArray)) {
      $query = "INSERT INTO `groups`(`GroupName`) VALUES ('$group_name')";
      $queryResult = mysqli_query($connection, $query);
      
      $query = "INSERT INTO `users`(`GroupName`, `Username`) VALUES ('$group_name', '$username')";
      $queryResult = mysqli_query($connection, $query);
      
      
    } // if
    
    // Else check if there is a group with the same user in,
    // if not, add him.
    else {
      $query = "SELECT GroupName FROM users 
                WHERE GroupName = '$group_name' AND Username = '$username'";
                
      $queryResult = mysqli_query($connection, $query);
      $rowArray = mysqli_fetch_array($queryResult);
      
      // Insert username.
      if(empty($rowArray)) {
        $query = "INSERT INTO `users`(`GroupName`, `Username`) VALUES ('$group_name', '$username')";
        $queryResult = mysqli_query($connection, $query);
        
        
      } // if
      
    } // else
        
    
  
  
  
  $query = "SELECT GroupName FROM users 
            WHERE Username = '$username'";
  $queryResult = mysqli_query($connection, $query);
  
  echo "</p>";
  
  while ($row = $queryResult->fetch_assoc()) {
    echo "<p>" . $row["GroupName"] . "</p>";
  }
  echo "<p>";
  
  mysqli_close($connection);  
  

?>
                    </p>
							
                    <a href="#previousgrp" class="btn btn-default btn-xl wow tada page-scroll">Previous groups</a>
                </div>
            </div>
        </div>
    </section>
    
    
        <section class="bg-primary" id="previousgrp">
        <div class="container">
            <div class="row">
                <div class="col-lg-8 col-lg-offset-2 text-center">
                    <h2 class="section-heading">Your previous groups at the moment are:</h2>
                    <hr class="light">
                    <p class="text-faded">
                      No previous groups.
                    </p>
							  </div>
            </div>
        </div>
    </section>


        
    


	
    <section id="contact">
        <div class="container">
            <div class="row">
                <div class="col-lg-8 col-lg-offset-2 text-center">
                    <h2 class="section-heading">Let's Get In Touch!</h2>
                    <hr class="primary">
                    <p>Ready to share your links, and find the latest trends?<br> That's great!<br><br>
					   Do you still have questions?<br>
					   Give us a call or send us an email and we will get back to you as soon as possible!</p>
                </div>
                <div class="col-lg-4 col-lg-offset-2 text-center">
                    <i class="fa fa-phone fa-3x wow bounceIn"></i>
                    <p>123-456-6789</p>
                </div>
                <div class="col-lg-4 text-center">
                    <i class="fa fa-envelope-o fa-3x wow bounceIn" data-wow-delay=".1s"></i>
                    <p><a href="mailto:your-email@your-domain.com">contact@shareurl.com</a></p>
                </div>
            </div>
        </div>
    </section>

    <!-- jQuery -->
    <script src="js/jquery.js"></script>

    <!-- Bootstrap Core JavaScript -->
    <script src="js/bootstrap.min.js"></script>

    <!-- Plugin JavaScript -->
    <script src="js/jquery.easing.min.js"></script>
    <script src="js/jquery.fittext.js"></script>
    <script src="js/wow.min.js"></script>

    <!-- Custom Theme JavaScript -->
    <script src="js/creative.js"></script>

</body>

</html>

 
 
 
 