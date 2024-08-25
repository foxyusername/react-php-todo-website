<?php 
include('../database.php');
header("Access-Control-Allow-Origin: {$_ENV['CLIENT_URL']}");
header('Access-Control-Allow-Credentials: true');
use \Firebase\JWT\JWT;
use \Firebase\JWT\Key;


if ($_SERVER['REQUEST_METHOD'] === 'POST'){


$taskName = $_POST['taskName'];
$deadline = $_POST['deadline'];

//decode jwt token and get userId

$jwt =$_COOKIE['auth_token'];
$decoded = JWT::decode($jwt, new Key($_ENV['SECRET_KEY'], 'HS256'));

$userId = $decoded -> userId;

//get current time
$query = "INSERT INTO tasklist (task,deadline,userId) VALUES ('$taskName','$deadline','$userId')";

//insert new row into the database

$result = mysqli_query($conn,$query);

if(mysqli_error($conn))  die(json_encode(array("message" => "something went wrong", "status" => 0)));

$last_id = mysqli_insert_id($conn);

if($result) echo json_encode($last_id);

}
?>