<?php
session_start();
header('Access-Control-Allow-Origin: *');
include('./database.php');


if ($_SERVER['REQUEST_METHOD'] === 'POST'){

$username=$_POST['username'];
$password=$_POST['password'];
$email=$_POST['email'];

//check if the username is already occupied

//query mysql database and search for username
//if array returns zero then it means there arent any users and qualify

$query = "SELECT * FROM users WHERE username = '{$username}'";
$result = mysqli_query($conn,$query);

if(mysqli_num_rows($result) === 0){
   
$insertQuery = "INSERT INTO users (username,email,passkey) VALUES ('$username','$email','$password')";
$insertResult = mysqli_query($conn,$insertQuery);

if (mysqli_error($conn)) {
    echo json_encode(array("message" => "Error occurred: " . mysqli_error($conn), "status" => 0));
} else {
    echo json_encode(array("message" => "Inserted user credentials successfully", "status" => 1));
    
//create session after succesfull registration

//$lastId =mysqli_insert_id($conn);
//$_SESSION['userId'] = $lastId;

}

}else{

    $response = array(
        "message" => "user with same username already exists",
        "status" => 2
    );

   echo json_encode($response);
}

}else{
    echo "you can't access this site";
}

?>
