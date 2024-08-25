<?php 
include('../database.php');
header("Access-Control-Allow-Origin: {$_ENV['CLIENT_URL']}");
header('Access-Control-Allow-Credentials: true');
use \Firebase\JWT\JWT;
use \Firebase\JWT\Key;

//decode jwt token and get the userId

$jwt =$_COOKIE['auth_token'];
$decoded = JWT::decode($jwt, new Key($_ENV['SECRET_KEY'], 'HS256'));

$userId = $decoded -> userId;

//make query to todolist table and fetch data

$query = "SELECT * FROM tasklist WHERE userId = $userId";

$result = mysqli_query($conn,$query);

if(mysqli_error($conn)) die("something went wrong");

$rows = mysqli_fetch_all($result,MYSQLI_ASSOC);

if(!empty($rows)){
  echo json_encode($rows);
}else{
  echo json_encode(array("message" => "user doesn't have any tasks added", "status" => 0));
}

?>