<!DOCTYPE html>
<html lang="en">

<head>

    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="description" content="">
    <meta name="author" content="">

    <title>ShareURL - Sign Up</title>

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
                <a class="navbar-brand page-scroll" href="#page-top">Top</a>
            </div>

            <!-- Collect the nav links, forms, and other content for toggling -->
            <div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
                <ul class="nav navbar-nav navbar-right">
                    <li>
                      <a class="page-scroll" href="index.html">Homepage</a>
                    </li>		
                    <li>
                        <a class="page-scroll" href="#signup">Sign Up</a>
                    </li>
                    <li>
                        <a class="page-scroll" href="#faq">FAQ</a>
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
                <h1>Sign up now!</h1>
                <hr>
                <p>Are you ready to join us? <br> Just press the button below!</p>
                
                <a href="#signup" class="btn btn-default btn-xl wow tada page-scroll">Sign Up</a>

                
            </div>
        </div>
    </header>
    
    <section class="bg-primary" id="signup">
      <div class="container">
            <div class="row">
                <div class="col-lg-8 col-lg-offset-2 text-center">
                    <h2 class="section-heading">Your friends await to receive your links!</h2>
                    <hr class="light">
                    <p class="text-faded">
                      Choose a username and a group to join. If there is no group with the name chosen, a new group will be created.
                    </p>

					
                	<form action="newaccount.php" method="post">
                    <p>Username : <br><font color="black">
                      <input type="text" name="username"></font>
                    </p>
                    <p>Group Name: <br><font color="black">
                      <input type="text" name="group_name"></font>
                    </p>
                    <p><input type="submit" class="btn btn-default btn-xl"></p>						
                </form>	
					<br>
					<p class="text-faded">Still having questions? Try reffering to the FAQ section.</p>
                    <a href="#faq" class="btn btn-default btn-xl page-scroll">FAQ</a>
                </div>
            </div>
        </div>
    </section>
    
     <aside class="bg-dark" id="faq">
        <div class="container text-center">
            <div class="call-to-action">
                <h2>FAQ</h2>
				<h3>Is it free to use ShareURL?</h3>
					<p>It is completely free to use ShareURL at the momment.</p>
				
				<h3>Why can't I join a group?</h3>
					<p>You might use a wrong name for the group.</p>
				
				<h3>What is ShareURL?</h3>
					<p>It is a Google Chrome Extension, an application that run inside the Chrome browser <br>
          and provide additional functionality and customized browsing experiences.
					</p>
				<br>
				<h3>More questions?</h3><br>
				
				<p>Don't hesitate!</p>
                <a href="#contact" class="btn btn-default btn-xl wow tada page-scroll">Contact Us!</a>
            </div>
        </div>
    </aside>
    
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
