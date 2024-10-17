<?php
include('connect.php');
include('header.php');

// ini_set('display_errors', '1');
// ini_set('display_startup_errors', '1');
// error_reporting(E_ALL);

// get the HTTP method, path and body of the request
$headers = getallheaders();

$method = $_SERVER['REQUEST_METHOD'];
$request = explode('/', trim($_SERVER['PATH_INFO'],'/'));
$input = json_decode(file_get_contents('php://input'),true);
 
 
// retrieve the table and key from the path
$table = preg_replace('/[^a-z0-9_]+/i','',array_shift($request));
$key = array_shift($request)+0;

$search_option = "";

include $table."/config/condition.php";
 
// escape the columns and values from the input object
$columns = is_array($input) ? preg_replace('/[^a-z0-9_]+/i','',array_keys($input)) : array();
$values = is_array($input) ? array_map(function ($value) use ($link) {
  if ($value===null) return null;
  return mysqli_real_escape_string($link,(string)$value);
},array_values($input)) : array();

// build the SET part of the SQL command
$set = '';
for ($i=0;$i<count($columns);$i++) {
  $set.=($i>0?',':'').'`'.$columns[$i].'`=';
  $set.=($values[$i]===null?'NULL':'"'.addslashes($values[$i]).'"');
}


// create SQL based on HTTP method
switch ($method) {
  case 'GET': 
    include $table."/read.php"; break;
  case 'PUT':
    include $table."/update.php"; break;
  case 'POST':
    include $table."/create.php"; break;
  case 'DELETE':
    include $table."/delete.php"; break;
}

mysqli_close($link);
?>