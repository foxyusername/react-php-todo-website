<?php 
require '../vendor/autoload.php';
$dotenv = Dotenv\Dotenv::createImmutable(__DIR__);
$dotenv->load();
header("Access-Control-Allow-Origin: {$_ENV['CLIENT_URL']}");
header('Access-Control-Allow-Credentials: true');


if(isset($_COOKIE['auth_token'])){
    setcookie('auth_token', '', time() - 3600,'/','', false,true);
    unset($_COOKIE['auth_token']);
    echo json_encode(array("message" => "cookie got deleted succesfully", "status" => 1));
}else{
    echo json_encode(array("message" => "something went wrong, cookie doesn't exist", "status" => 0));
}

?>