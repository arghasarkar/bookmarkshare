<?php
  
  require_once('config.inc.php');
  $connection = mysqli_connect($database_host, $database_user, $database_pass, $database_name);
  if($connection -> connect_error) {
    die('Connect Error ' . $connection -> connect_errno . ' ' . $connection -> connect_error);
  } // if
  
  $group_name = $_GET['groupname'];
  $username = $_GET['username'];  
  $join_status = $_GET['join_status'];

  // If join status is true, add person.
  if ($join_status == "true") {
    $query = "SELECT GroupName FROM previous_groups 
              WHERE GroupName = '$group_name' AND Username = '$username'";
    $queryResult = mysqli_query($connection, $query);
    $rowArray = mysqli_fetch_array($queryResult);

    if(empty($rowArray)) {
      $query = "INSERT INTO `previous_groups`(`GroupName`, `Username`) VALUES ('$group_name', '$username')";
      $queryResult = mysqli_query($connection, $query);
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
      
      echo "join";
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
        
        echo "join";
      } // if
      
      // Else, go to the wrong input page.
      else {
        echo "Wrong input, username might already be in the group.";
      } // else
      
    } // else
   
    // Close connection.
    mysqli_close($connection);  
    
    exit;
  } // if
  
  // Else remove him.
  else if($join_status == "false") {
    // Look for the group in the users table.
    $query = "SELECT GroupName FROM users 
              WHERE GroupName = '$group_name'";
    $queryResult = mysqli_query($connection, $query);
    $rowArray = mysqli_fetch_array($queryResult);

    // If no group in the table => wrong input.
    if(empty($rowArray)) {
      echo "Wrong input, the group name might be wrong.";
    } // if
    
    // Else delete row from the table.
    else {
      $query = "SELECT GroupName FROM users 
        WHERE GroupName = '$group_name' AND Username = '$username'";
      $queryResult = mysqli_query($connection, $query);  
      $rowArray = mysqli_fetch_array($queryResult);

      if (empty($rowArray)) {
        echo "Wrong input, username - group combination might not exist";
      } // if
      
      else {
        $query = "DELETE FROM users 
                  WHERE Username = '$username' AND GroupName = '$group_name'";
        $queryResult = mysqli_query($connection, $query);
        
        echo "left";
        
        // If no more users in the group, delete the group altogether.
        $query = "SELECT GroupName FROM users 
                WHERE GroupName = '$group_name'";
        $queryResult = mysqli_query($connection, $query);
        $rowArray = mysqli_fetch_array($queryResult);
        
        if (empty($rowArray)) {
          $query = "DELETE FROM groups 
                    WHERE GroupName = '$group_name'";
          $queryResult = mysqli_query($connection, $query);
        } // if 
      } // else
    } // else
    
    // Close connection.
    mysqli_close($connection);
    
    exit;
  } // else if
  
  // If join_status is not true or false, give wrong input.
  else {
    echo "Wrong input, join_status might be wrong.";
  } // else
  
  exit;
  
  ?>