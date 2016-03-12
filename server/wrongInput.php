<?php
  session_start();

  echo $_SESSION['state'];
  echo $_SESSION['groupname'] . " and " . $_SESSION['username'] . " and " . $_SESSION['join_status'];
  
  echo "Wrong input bro! Try again :)";

?>