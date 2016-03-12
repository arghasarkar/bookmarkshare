<?php
  
  require_once('config.inc.php');
  $connection = mysqli_connect($database_host, $database_user, $database_pass, $database_name);
  if($connection -> connect_error) {
    die('Connect Error ' . $connection -> connect_errno . ' ' . $connection -> connect_error);
  }
  
  $username = $_GET['username'];
  $groupname = $_GET['groupname'];
  $join_status = $_GET['join_status'];
  
  // If join status is true, add person.
  if ($join_status == "true") {
    // Check if there is another group with the same name.
    $query = "SELECT GroupName FROM groups 
              WHERE groups.GroupName = '$group_name'";
    $queryResult = mysqli_query($connection, $query);
    $rowArray = mysqli_fetch_array($queryResult);

    // If not, insert in both tables.
    if(empty($rowArray)) {
      $query = "INSERT INTO groups VALUES ('$group_name')";
      $queryResult = mysqli_query($connection, $query);
      
      $query = "INSERT INTO users VALUES ('$username', '$group_name')";
      $queryResult = mysqli_query($connection, $query);
    }
    
    // Else check if there is a group with the same user in.
    else {
      $query = "SELECT GroupName FROM users 
                WHERE users.GroupName = '$group_name' AND users.Username = '$username'";
      $queryResult = mysqli_query($connection, $query);
      $rowArray = mysqli_fetch_array($queryResult);
      
      // If not, insert.
      if(empty($rowArray)) {
        $query = "INSERT INTO users VALUES ('$username', '$group_name')";
        $queryResult = mysqli_query($connection, $query);
      }
      
      // Else, go to the wrong input page.
      else {
        header("Location: wrongInput.php");
      }
    }
   
    // Close connection.
    mysqli_close($connection);  
  }
  
  // Else remove him.
  else if($join_status == "false") {
    // Look for the group in the users table
    $query = "SELECT GroupName FROM users 
              WHERE users.GroupName = '$group_name'";
    $queryResult = mysqli_query($connection, $query);
    $rowArray = mysqli_fetch_array($queryResult);

    // If no group in the table => wrong input
    if(empty($rowArray)) {
      header("Location: wrongInput.php");
    }
    
    // Else delete row from the table
    else {
      $query = "DELETE FROM users 
                WHERE users.Username = '$username' AND users.GroupName = '$group_name'";
      $queryResult = mysqli_query($connection, $query);
      
      // If no more users in the group, delete the group altogether.
      $query = "SELECT GroupName FROM users 
              WHERE users.GroupName = '$group_name'";
      $queryResult = mysqli_query($connection, $query);
      $rowArray = mysqli_fetch_array($queryResult);
      
      if (empty($rowArray)) {
        $query = "DELETE FROM groups 
                  WHERE groups.GroupName = '$group_name'";
        $queryResult = mysqli_query($connection, $query);
      }
    }
  }
  
  exit;
  
  ?>