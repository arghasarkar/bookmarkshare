<!DOCTYPE html>
<html lang="en">

<head>

    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="description" content="">
    <meta name="author" content="">

    <title>Welcome to Rise</title>

    <!-- Bootstrap Core CSS -->
    <link rel="stylesheet" href="css/bootstrap.min.css" type="text/css">

    <!-- Custom Fonts -->
    <link href='http://fonts.googleapis.com/css?family=Open+Sans:300italic,400italic,600italic,700italic,800italic,400,300,600,700,800' rel='stylesheet' type='text/css'>
    <link href='http://fonts.googleapis.com/css?family=Merriweather:400,300,300italic,400italic,700,700italic,900,900italic' rel='stylesheet' type='text/css'>
    <link rel="stylesheet" href="font-awesome/css/font-awesome.min.css" type="text/css">

    <!-- Plugin CSS -->
    <link rel="stylesheet" href="css/animate.min.css" type="text/css">

    <!-- Custom CSS -->
    <link rel="stylesheet" href="css/creative.css" type="text/css">

    <!-- HTML5 Shim and Respond.js IE8 support of HTML5 elements and media queries -->
    <!-- WARNING: Respond.js doesn't work if you view the page via file:// -->
    <!--[if lt IE 9]>
        <script src="https://oss.maxcdn.com/libs/html5shiv/3.7.0/html5shiv.js"></script>
        <script src="https://oss.maxcdn.com/libs/respond.js/1.4.2/respond.min.js"></script>
    <![endif]-->

</head>

<body id="page-top">

	<section class="bg-primary" id="book">
        <div class="container">
            <div class="row">
                <div class="col-lg-8 col-lg-offset-2 text-center">
                    <h2 class="section-heading">Thank you for choosing us!</h2>
                    <hr class="light">
					<?php
					  $date = $_POST["date"];
                      $startTime = $_POST["startTime"];
					  $endTime = $_POST["endTime"];
					  
					  // ASTA E MESAJUL CU STRINGUL PE CARE IL POTI FOLOSI!!!
					  // VEZI DACA POTI SA DAI ADD CUMVA IN BAZA BAZAT PE EL?
					  $message = $date . " + " .  $startTime . ":00 + " . $endTime + ":00";
					  
						if (strlen($date) != 10 || strlen($startTime) != 5 || strlen($endTime) != 5) {
							echo "<p>Input invalid! Check again your date or times and try again please. 
								  <br> Remember to use "."-"." and ".":"." for date and time.</p>";
							echo "<a href=" . "'book.php'" . " class=" . "'btn btn-default btn-xl page-scroll'" . ">Book again</a>";
						}
						else if ($date[4] == "-" && $date[7] == "-" && $startTime[2] == ":" && $endTime[2] == ":") {
							echo "<p>Input invalid! Check again your date or times and try again please. 
								  <br> Remember to use "."-"." and ".":"." for date and time.</p>";
							echo "<a href=" . "'book.php'" . " class=" . "'btn btn-default btn-xl page-scroll'" . ">Book again</a>";
						}
						else {
							list($year, $month, $day) = explode("-", $date);
							list($hourStartTime, $minutesStartTime) = explode("-", $startTime);
							list($hourEndTime, $minutesEndTime) = explode("-", $endTime);
							if (is_numeric($year) && is_numeric($month) && is_numeric($day) && is_numeric($hourStartTime) 
								&& is_numeric($minutesStartTime) && is_numeric($hourEndTime) && is_numeric($minutesEndTime)) {
								if (1980 > intval($year) || intval($year) > 2050 ||
									(01 > intval($month)) || (intval($month) > 12) ||
									(01 > intval($day)) || (intval($day) > 31)) {
										
									echo "<p>Date input invalid! Check again your date and try again please. 
										  <br> Remember to use "."-"." for it.</p>";
									echo "<a href=" . "'book.php'" . " class=" . "'btn btn-default btn-xl page-scroll'" . ">Book again</a>";
								}
								else {
									list($hour, $minutes) = explode("-", $startTime);
									if (intval($hour) > 23 || intval($hour) < 0 || intval($minutes) > 59 || intval($hour) < 0) {
										echo "<p>Start time input invalid! Check again your start time and try again please. 
											  <br> Remember to use ".":"." for it.</p>";
										echo "<a href=" . "'book.php'" . " class=" . "'btn btn-default btn-xl page-scroll'" . ">Book again</a>";
									}
									else {
										list($hour, $minutes) = explode("-", $endTime);
										if (intval($hour) > 23 || intval($hour) < 0 || intval($minutes) > 59 || intval($hour) < 0) {
											echo "<p>End time input invalid! Check again your end time and try again please. 
												<br> Remember to use ".":"." for it.</p>";
											echo "<a href=" . "'book.php'" . " class=" . "'btn btn-default btn-xl page-scroll'" . ">Book again</a>";										
										}
										echo "<p>Your booking was sent!</p>";
										// else SEND MESSAGE!!!
									}					
								}
							}
							else {
								echo "<p>Your booking was sent!</p>";
								// SEND MESSAGE
							}
						}
					  ?>
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
                    <p>Have any concerns or problems? <br>
					   Give us a call or send us an email and we will get back to you as soon as possible!</p>
                </div>
                <div class="col-lg-4 col-lg-offset-2 text-center">
                    <i class="fa fa-phone fa-3x wow bounceIn"></i>
                    <p>123-456-6789</p>
                </div>
                <div class="col-lg-4 text-center">
                    <i class="fa fa-envelope-o fa-3x wow bounceIn" data-wow-delay=".1s"></i>
                    <p><a href="mailto:your-email@your-domain.com">mcr@thinkrise.com</a></p>
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