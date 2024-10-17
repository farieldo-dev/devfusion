<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Authorization, Origin, X-Requested-With, Content-Type,      Accept");
header('Access-Control-Allow-Methods: POST, GET, DELETE, PUT,  OPTIONS');
header("Content-Type: application/json");

// ini_set('display_errors', '1');
// ini_set('display_startup_errors', '1');
// error_reporting(E_ALL);

$my_hostname = '';
$my_username = '';
$my_password = '';
$my_schema = '';
ini_set('max_execution_time', 0); 

$link = mysqli_connect($my_hostname, $my_username, $my_password, $my_schema);
// Check connection
if (mysqli_connect_errno()){
	echo "Failed to connect to MySQL: " . mysqli_connect_error();
}

$headers = getallheaders();

$token = explode(" ",$headers['Authorization']);
$token = $token[1];

$part = explode(".",$token);
$header = $part[0];
$payload = $part[1];
$signature = $part[2];

$valid = hash_hmac('sha256',"$header.$payload",'',true);
$valid = base64_encode($valid);


// if($signature == $valid){

//    $payload = base64_decode($payload);

//    $yummy = json_decode($payload);

//    $id_user = $yummy->uid;

// }else{
//    die(json_encode(array('message' => 'ERROR', 'code' => 1337)));
// }
?>