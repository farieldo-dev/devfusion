<?php

$sql = "insert into `$table` set $set";

// excecute SQL statement
$result = mysqli_query($link, $sql);

// // die if SQL statement failed
if (!$result) {
  
    echo mysqli_error($link);

} else {
  
    $new = mysqli_insert_id($link);

    echo $new;

}

?>