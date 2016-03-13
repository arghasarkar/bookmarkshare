<?php

  ini_set('display_errors', 'On');
  error_reporting(E_ALL);



  require('Pusher.php');
    $options = array(
    'cluster' => 'eu',
    'encrypted' => true
  );
    $pusher = new Pusher("a7fdcaa3c67e836a3fcc", "223d32ecdb42ee4ad0f4", 187215, $options);
  $response = $pusher->trigger('test_channel', 'newurl', array( 'message' => 'Facebook.com'));
/*   // Connect to db.
  require_once('config.inc.php');
  $connection = mysqli_connect($database_host, $database_user, $database_pass, $database_name);
  if($connection -> connect_error) {
    die('Connect Error ' . $connection -> connect_errno . ' ' . $connection -> connect_error);
  } // if
  
  // Get the group name, username and url.
  $group_name = $_GET['groupname'];
  $username = $_GET['username'];
  $url = $_GET['url']; */
  


  

/*   mysqli_close($connection);  
    
  exit; */
  
?>