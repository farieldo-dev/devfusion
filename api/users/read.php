<?php

// include('config/format.php');

include('config/search.php');

$sql = "select * from $table $search_line limit 100";

// excecute SQL statement
$result = mysqli_query($link, $sql);

// // die if SQL statement failed
if (!$result) {
  
    header('HTTP/1.1 400 Bad Request', true, 400);
    echo mysqli_error($link);

} else {

  $data = array();
  while($r = mysqli_fetch_assoc($result)) {
      $data[] = $r;
  }
  
  $json = json_encode($data);

  print_r($json);
        
  exit();

}

?>