<?php 
include('../database.php');
header("Access-Control-Allow-Origin: {$_ENV['CLIENT_URL']}");

if ($_SERVER['REQUEST_METHOD'] === 'POST'){

$taskId = $_POST['taskId'];

//make query to database

$query = "DELETE FROM tasklist WHERE id = $taskId";

$result = mysqli_query($conn,$query);

if(mysqli_error($conn)) {
    http_response_code(500);
    die(json_encode(array("message" => 'something went wrong', "status" => 0)));
};

if($result) echo json_encode($result);
}

?>