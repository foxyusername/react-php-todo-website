<?php 
session_start();
header('Access-Control-Allow-Origin: *');
include('./database.php');


  
$username = $_POST['username'];
$password = $_POST['password'];

//check if username exists in database
//check if password is correct
//if logged in create session token

$checkUsername = "SELECT * FROM users WHERE username = '$username'";

$result = mysqli_query($conn,$checkUsername);

if(mysqli_error($conn)) die('something went wrong while checking the username');

if(mysqli_num_rows($result) === 0){
    echo json_encode(array("message" => "username doesn't exist","status" => 0));
}else{

 //check if password is correct

  $checkPassword = "SELECT * FROM users WHERE username = '$username' AND passkey = '$password'";

  $lastResult = mysqli_query($conn,$checkPassword);

  if(mysqli_error($conn)) die('something went wrong while checking the password');

  if(mysqli_num_rows($lastResult) === 0){
    echo json_encode(array("message" => "password is incorrect","status" => 0));
  }else{

    echo json_encode(array("message" => "password was correct","status" => 1));


    //create the session variable
     /* $row = mysqli_fetch_assoc($lastResult);
      $userId = $row['id'];
    
      $_SESSION['userId'] = $userId;*/
}

}
?>