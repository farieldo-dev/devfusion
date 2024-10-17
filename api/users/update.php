<?php

$sql = "update `$table` set $set where id=$key";

// excecute SQL statement
$result = mysqli_query($link, $sql);

// // die if SQL statement failed
if (!$result) {
  
    header('HTTP/1.1 400 Bad Request', true, 400);
    echo mysqli_error($link);

} else {

    echo mysqli_affected_rows($link);

}

?>