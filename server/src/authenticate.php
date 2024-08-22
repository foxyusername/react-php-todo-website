<?php
require '../vendor/autoload.php';
$dotenv = Dotenv\Dotenv::createImmutable(__DIR__);
$dotenv->load();
header("Access-Control-Allow-Origin: {$_ENV['CLIENT_URL']}");
header('Access-Control-Allow-Credentials: true');
use \Firebase\JWT\JWT;
use \Firebase\JWT\Key;


$jwt = isset($_COOKIE['auth_token']) ? $_COOKIE['auth_token'] : null;

if($jwt){
try{
 $decoded = JWT::decode($jwt, new Key($_ENV['SECRET_KEY'], 'HS256'));

 $userId = $decoded->userId;
 
 echo json_encode(array("message" => "Token is valid", "status" => 1));

}catch(Exception $e) {
    echo json_encode(array("message" => "Token is invalid", "status" => 0));
}
}else{
    echo json_encode(array("message" => "authentication token is not presented", "status" => 0));
}


?>