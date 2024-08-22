<?php 
require __DIR__ . '/../vendor/autoload.php'; // Autoload Composer dependencies

$dotenv = Dotenv\Dotenv::createImmutable(__DIR__);
$dotenv->load();

$serverName = $_ENV['DB_HOST'];
$user = $_ENV['DB_USER'];
$dbpassword = $_ENV['DB_PASSWORD'];
$dbname = $_ENV['DB_DATABASE'];

$conn = mysqli_connect($serverName,$user,$dbpassword,$dbname);

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

?>