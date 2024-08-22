<?php 
include('./database.php');
header("Access-Control-Allow-Origin: {$_ENV['CLIENT_URL']}");
header('Access-Control-Allow-Credentials: true');
use \Firebase\JWT\JWT;


if ($_SERVER['REQUEST_METHOD'] === 'POST'){

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
   //authenticate user with jwt token

  //get logged in user's id

  $row = mysqli_fetch_assoc($result);
  $userId = $row['id'];

  //create token

   $expirationTime = time() + (10 * 365 * 24 * 60);
   $issuedAt = time();
   $payload = [
    'iat' => $issuedAt,
    'exp' => $expirationTime,
    'userId' => $userId
   ];

   $jwt = JWT::encode($payload,$_ENV['SECRET_KEY'], 'HS256');

 //store token in cookie
   setcookie("auth_token",$jwt,$expirationTime, "/", "", false, true);

 //send response
   echo json_encode(array("message" => "password was correct","status" => 1));

}

}
}
?>